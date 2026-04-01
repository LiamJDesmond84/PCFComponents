import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IGraphProps } from "./components/Graph";
import Graph from "./components/Graph";

export class AccountActivitiesGraph
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private context!: ComponentFramework.Context<IInputs>;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.context = context;
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    this.context = context;

    const props: IGraphProps = {
      context: this.context
    };

    return React.createElement(Graph, props);
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Cleanup handled by React / no resources to dispose
  }
}