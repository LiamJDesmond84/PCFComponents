import TaskCard from "./components/TaskCard";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";
import { Task, User } from "./types";

export class CustomGallery implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private output: string;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

    //     const user: User = {
    //         id: "1",
    //         name: "Liam Desmond",
    //         profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
    //     }

    //     const tasks: Task[] = [
    //         {
    //             id: "1",
    //             userId: "1",
    //             title: "Task 1",
    //             category: "Ready",
    //             estimate: "2H",
    //             status: "Done",
    //             estimatedHours: 4,
    //             spentHours: 2
    //         }
    // ]
    const users: Record<string, User> = {};
    const tasksByUser: Record<string, Task[]> = {};

    if(context?.parameters?.tasks?.records) {
        for(const Id in context.parameters.users.records) {
            const record = context.parameters.users.records[Id];
            const userId = record.getValue("id") as string;
            console.log(record.getValue("id"));
            console.log(record.getValue("name"));

            users[userId] = {
                id: userId,
                name: record.getValue("name") as string,
                profileImage: record.getValue("profileImage") as string
            }
            tasksByUser[userId] = [];
        }
         };

        if (context?.parameters?.tasks?.records) {
      for (const Id in context.parameters.tasks.records) {
        const recordTaskValue = context.parameters.tasks.records[Id]
        const userId = (recordTaskValue.getValue("userId") as string) || ""
        if (!userId || !users[userId]) continue

        const task: Task = {
          id: recordTaskValue.getValue("id") as string,
          userId: userId,
          title: recordTaskValue.getValue("title") as string,
          category: recordTaskValue.getValue("category") as
            | "Ready"
            | "In Progress"
            | "Review",
          estimate: recordTaskValue.getValue("estimate") as string,
          status:
            (recordTaskValue.getValue("status") as string) === "Done"
              ? "Done"
              : "Not Done",
          estimatedHours:
            (recordTaskValue.getValue("estimatedHours") as number) || 0,
          spentHours: (recordTaskValue.getValue("spentHours") as number) || 0,
        }
        tasksByUser[userId].push(task)
      }
    }



        return React.createElement(
            TaskCard, {tasks: tasksByUser[Object.keys(users)[0]] || [], user: users[Object.keys(users)[0]], expanded: true}
        );
    }

    private updateValue(value: string) {
        this.output = value;
        this.notifyOutputChanged();
    }
    

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            sampleProperty: this.output
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
