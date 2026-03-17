import * as React from 'react';
import { Input, Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

export const HelloWorld = ({name}: IHelloWorldProps) => {
  console.log("Test");
  
  return (
    <Input value={name}
    />
  );
};
