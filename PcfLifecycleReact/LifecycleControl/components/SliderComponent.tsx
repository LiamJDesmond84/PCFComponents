import * as React from "react";
// import type { JSXElement } from "@fluentui/react-components";
import { useId, Label, Slider } from "@fluentui/react-components";
import { useState } from "react";

export interface SliderProps {
  sliderValue: number,
  onSliderChange: (value: number) => void;
}


export const SliderComponent = ({sliderValue, onSliderChange}: SliderProps): JSX.Element => {

  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider size="medium" defaultValue={sliderValue} id={id} onChange={(e) => onSliderChange(parseInt(e.target.value))} />
    </>
  );
};