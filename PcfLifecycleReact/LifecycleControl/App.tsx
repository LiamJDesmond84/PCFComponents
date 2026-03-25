import * as React from "react";
import { LifecycleDemo } from "./components/LifecycleDemo";
import { SliderComponent} from "./components/SliderComponent";
import { StatusPanel } from "./components/StatusPanel";

interface AppProps {
  value: string;
  onTextChange: (value: string) => void;
  sliderValue: number,
  onSliderChange: (value: number) => void;
}

export const App: React.FC<AppProps> = ({ value, onTextChange, sliderValue, onSliderChange }) => {
  return (
    <div>
      <LifecycleDemo value={value} onTextChange={onTextChange} />
      <StatusPanel message="Second React component" />
      <SliderComponent sliderValue={sliderValue} onSliderChange={onSliderChange} />
    </div>
  );
};