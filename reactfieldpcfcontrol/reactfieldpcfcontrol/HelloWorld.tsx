
import * as React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Input } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
  updateValue: (value: string) => void;
}

export const HelloWorld: FC<IHelloWorldProps> = ({ name: propName, updateValue }) => {
  const [name, setName] = useState<string>(propName ?? '');

  useEffect(() => {
    setName(propName ?? '');
  }, [propName]);

  return (
    <Input
      value={name}
      onChange={(e, data) => {
        updateValue(data.value ?? '');
        setName(data.value ?? '')}}
    />
  );
};