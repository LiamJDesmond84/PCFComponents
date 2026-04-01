import * as React from "react";
import { useEffect, useState } from "react";
import { IInputs } from "../generated/ManifestTypes";
import { Label } from '@fluentui/react-components';
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export interface IGraphProps {
    context: ComponentFramework.Context<IInputs>;
}

const Graph: React.FC<IGraphProps> = ({ context }) => {
    const [activities, setActivities] = useState<{ name: string; value: number }[]>([]);
    const [error, setError] = useState<string>("");

    const COLORS = ["#0078d4", "#107c10", "#d13438", "#ff8c00", "#5c2d91"];

    useEffect(() => {
        const loadActivities = async (): Promise<void> => {
            try {

                // STEP 1: Get the current Account ID from the form context
                const accountId = ((context.mode as { contextInfo?: { entityId?: string } }).contextInfo?.entityId ?? "").replace(/[{}]/g, "");

                // -----------------------------
                // STEP 2: Get all Contacts related to this Account
                // We are querying the contact table where parentcustomerid = accountId
                // This gives us all contacts under the account
                // -----------------------------
                const contacts = await context.webAPI.retrieveMultipleRecords(
                    "contact",
                    `?$select=contactid&$filter=_parentcustomerid_value eq ${accountId}`
                );

                // cast once
                const contactIds = (contacts.entities as { contactid: string }[]).map(c => c.contactid);

                // -----------------------------
                // STEP 3: Build filter for activityparty
                // We still need this filter even though we use $expand.
                // $expand only brings back related activity data for the rows we already matched.
                // It does NOT automatically limit activityparty rows to this account's contacts.
                // So this filter is what keeps the query scoped to the current account/contact set.
                // -----------------------------
                const ids = [accountId, ...contactIds];

                const filter = ids.map(id => `_partyid_value eq ${id}`).join(" or ");

                // -----------------------------
                // STEP 4: Query activityparty to find activities related to those IDs
                // activityparty links contacts/accounts to activities (phone calls, emails, etc.)
                // We expand activityid_activitypointer to get the actual activity data
                // -----------------------------
                const result = await context.webAPI.retrieveMultipleRecords(
                    "activityparty",
                    `?$select=_activityid_value
                    &$filter=(${filter})
                    &$expand=activityid_activitypointer($select=activityid,subject,activitytypecode,statecode,createdon,description)`
                );

                // -----------------------------
                // STEP 5: Extract and deduplicate activities
                // Each activity can appear multiple times (multiple participants)
                // So we remove duplicates using activityid
                // -----------------------------
                const seen = new Set();

                // 👇 only cast once here — no big type needed
                const rows = result.entities as { activityid_activitypointer?: Record<string, unknown> }[];

                const activitiesArr = [];

                for (const row of rows) {
                    const activity = row.activityid_activitypointer as { activityid?: string; activitytypecode?: string } | undefined;

                    if (activity?.activityid && !seen.has(activity.activityid)) {
                        seen.add(activity.activityid);
                        activitiesArr.push(activity);
                    }
                }

                console.log("Activities", activitiesArr);


                // -----------------------------
                // STEP 6: Split by type - Optional
                // -----------------------------
                const phoneCalls = activitiesArr.filter(a => a.activitytypecode === "phonecall");
                const emails = activitiesArr.filter(a => a.activitytypecode === "email");
                const appointments = activitiesArr.filter(a => a.activitytypecode === "appointment");
                const tasks = activitiesArr.filter(a => a.activitytypecode === "task");

                // -----------------------------
                // STEP 7: Count by type
                // -----------------------------
                const counts: Record<string, number> = {
                    phonecall: 0,
                    email: 0,
                    appointment: 0,
                    task: 0
                };

                for (const activity of activitiesArr) {
                    const type = activity.activitytypecode;

                    if (type && counts[type] !== undefined) {
                        counts[type] += 1;
                    }
                }

                // -----------------------------
                // STEP 8: Convert counts into chart data
                // -----------------------------
                const chartData = [
                    { name: "Phone Calls", value: counts.phonecall },
                    { name: "Emails", value: counts.email },
                    { name: "Appointments", value: counts.appointment },
                    { name: "Tasks", value: counts.task }
                ].filter(item => item.value > 0);

                setActivities(chartData);


            } catch (e) {
                const message = e instanceof Error ? e.message : "Unknown error";
                setError(message);
            }
        };

        void loadActivities();
    }, [context]);

    if (error) {
        return <div>Failed to load task count: {error}</div>;
    }

    else return (
        <PieChart width={420} height={320}>
            <Pie
                data={activities}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label={({ name, value }) => `${name}: ${value}`}
            >
                {activities.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )

};

export default Graph;