
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Input } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
  updateValue: (value: string) => void;
}

export const HelloWorld = ({ name: propName, updateValue }: IHelloWorldProps) => {
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


// export interface IHelloWorldProps {
//   name?: string;
//   updateValue?: (value: string) => void;
// }

// export const HelloWorld = ({name, updateValue}: IHelloWorldProps) => {
//   return (
//     <Input
//     value={name}
//     onChange={(e, val) => val ? updateValue?.(val.value) : undefined}
//     />
//   );
// };
