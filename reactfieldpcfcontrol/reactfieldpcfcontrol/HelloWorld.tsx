import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { Input } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
  updateValue: (value: string) => void;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <Input 
      value={this.props.name}
      onChange={(e, newValue) => this.props.updateValue(newValue.value ?? '')}
      />
    )
  }
}
