import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LifecycleDemo } from "./components/LifecycleDemo";
import { App } from "./App";

export class LifecycleControl
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private notifyOutputChanged!: () => void;
  private currentValue = "";
  private currentSliderValue = 50;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    void state;
    this.notifyOutputChanged = notifyOutputChanged;
    this.currentValue = context.parameters.sampleText?.raw ?? "";
    this.currentSliderValue = context.parameters.sliderInput?.raw ?? 0;
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const officialValue = context.parameters.sampleText?.raw ?? "";
    const sliderValue = context.parameters.sliderInput?.raw ?? 0;

    return React.createElement(App, {
    value: officialValue,
    onTextChange: this.handleTextChange,
    sliderValue: sliderValue,
    onSliderChange: this.handleSliderChange
  });
  }

  private handleTextChange = (value: string): void => {
    this.currentValue = value;
    this.notifyOutputChanged();
  };

    private handleSliderChange = (value: number): void => {
    this.currentSliderValue = value;
    this.notifyOutputChanged();
  };

  public getOutputs(): IOutputs {
    return {
      sampleText: this.currentValue,
      sliderInput: this.currentSliderValue
    };
  }

  public destroy(): void {}
}


// import * as React from "react";
// import { IInputs, IOutputs } from "./generated/ManifestTypes";
// import { LifecycleDemo } from "./components/LifecycleDemo";

// export class LifecycleControl
//     implements ComponentFramework.ReactControl<IInputs, IOutputs> {
//     private notifyOutputChanged!: () => void;
//     private currentValue = "";
//     private lifecycleEvents: string[] = [];

//     private logLifecycle(eventName: string): void {
//         this.lifecycleEvents = [...this.lifecycleEvents, eventName];
//     }

//     public init(
//         context: ComponentFramework.Context<IInputs>,
//         notifyOutputChanged: () => void,
//         state: ComponentFramework.Dictionary
//     ): void {
//         void state;

//         this.notifyOutputChanged = notifyOutputChanged;
//         this.currentValue = context.parameters.sampleText?.raw ?? "";
//         this.logLifecycle("init()");
//     }

//     public updateView(
//         context: ComponentFramework.Context<IInputs>
//     ): React.ReactElement {
//         this.currentValue = context.parameters.sampleText?.raw ?? "";
//         this.logLifecycle("updateView()");

//         return React.createElement(LifecycleDemo, {
//             value: this.currentValue,
//             updatedProperties: context.updatedProperties ?? [],
//             lifecycleEvents: this.lifecycleEvents,
//             onTextChange: this.handleTextChange,
//             onClearTimeline: this.handleClearTimeline
//         });
//     }

//     private handleTextChange = (value: string): void => {
//         this.currentValue = value;
//         this.logLifecycle("notifyOutputChanged()");
//         this.notifyOutputChanged();
//     };

//     private handleClearTimeline = (): void => {
//         this.lifecycleEvents = [];
//         this.logLifecycle("timeline cleared");
//         this.notifyOutputChanged();
//     };

//     public getOutputs(): IOutputs {
//         this.logLifecycle("getOutputs()");
//         return {
//             sampleText: this.currentValue
//         };
//     }

//     public destroy(): void { }
// }