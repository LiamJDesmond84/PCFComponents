import * as React from 'react';
import { Label, Button } from '@fluentui/react-components';

export interface ICustomButtonProps {
  name?: string;
}



export const CustomButton = (props: ICustomButtonProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%', width: '100%'}}>      
      <Button onClick={onButtonClick}>
        Click me!
      </Button>
    </div>
  );
}

const onButtonClick = () => {
  console.log('Hello, World!');
}