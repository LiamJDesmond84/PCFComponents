import { IInputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PercentageChart } from "./components/PercentageChart";
import { ChartData, TableSummary } from "./ChartTypes";

export class PCFGraph implements ComponentFramework.StandardControl<IInputs, Record<string, unknown>> {
  private container: HTMLDivElement;
  private context!: ComponentFramework.Context<IInputs>;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.context = context;
    this.container = container;
    this.renderLoading();
    void this.loadChartData();
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.context = context;
  }

  public getOutputs(): Record<string, unknown> {
    return {};
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }

  private renderLoading(): void {
    ReactDOM.render(
      React.createElement("div", null, "Loading chart..."),
      this.container
    );
  }

  private renderChart(data: ChartData[]): void {
    const title = this.context.parameters.chartTitle?.raw ?? "Dataverse Summary";
    ReactDOM.render(
      React.createElement(PercentageChart, { title, data }),
      this.container
    );
  }

  private async loadChartData(): Promise<void> {
    try {
      const summaries: TableSummary[] = [
        {
          tableLogicalName: "opportunity",
          label: "Open Opportunities",
          value: await this.getOpenOpportunityCount()
        },
        {
          tableLogicalName: "incident",
          label: "Active Cases",
          value: await this.getActiveCaseCount()
        },
        {
          tableLogicalName: "lead",
          label: "Open Leads",
          value: await this.getOpenLeadCount()
        }
      ];

      const total = summaries.reduce((sum, item) => sum + item.value, 0);

      const chartData: ChartData[] = summaries.map((item) => ({
        name: item.label,
        value: total > 0 ? Math.round((item.value / total) * 100) : 0
      }));

      this.renderChart(chartData);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ReactDOM.render(
        React.createElement("div", null, `Failed to load chart: ${message}`),
        this.container
      );
    }
  }

  private async getOpenOpportunityCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "opportunity",
      "?$select=opportunityid&$filter=statecode eq 0"
    );

    return result.entities.length;
  }

  private async getActiveCaseCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "incident",
      "?$select=incidentid&$filter=statecode eq 0"
    );

    return result.entities.length;
  }

  private async getOpenLeadCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "lead",
      "?$select=leadid&$filter=statecode eq 0"
    );

    return result.entities.length;
  }
}
