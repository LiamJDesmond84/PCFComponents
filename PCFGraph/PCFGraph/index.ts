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
  this.renderLoading();
  void this.loadChartData();
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
          tableLogicalName: "task",
          label: "Open Opportunities",
          value: await this.getTaskCount()
        },
        {
          tableLogicalName: "team",
          label: "Team Membership",
          value: await this.getTeamCount()
        },
        {
          tableLogicalName: "crae5_application",
          label: "Open Applications",
          value: await this.getApplicationCount()
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

  private async getTaskCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "task",
      "?$select=processid&$filter=statecode eq 0"
    );

    return result.entities.length;
  }

  private async getTeamCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "team",
      "?$select=teamid&$filter=membershiptype eq 0"
    );

    return result.entities.length;
  }

  private async getApplicationCount(): Promise<number> {
    const result = await this.context.webAPI.retrieveMultipleRecords(
      "crae5_application",
      "?$select=crae5_applicationid&$filter=statecode eq 0"
    );

    return result.entities.length;
  }
}
