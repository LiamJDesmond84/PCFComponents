import * as React from 'react';
import { Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

export const HelloWorld = (props: IHelloWorldProps) => {
  return (
    <Label>
      Hello {props.name}!
    </Label>
  );
};
