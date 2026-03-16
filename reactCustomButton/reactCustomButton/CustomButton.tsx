import * as React from 'react';
import { Label, Button } from '@fluentui/react-components';
import { _context } from './services/DataverseServices';

export interface ICustomButtonProps {
  name?: string;
}



export const CustomButton = (props: ICustomButtonProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%', width: '100%'}}>      
      <Button
        onClick={() => {
          void (async () => {
            await onButtonClick();
          })();
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '62%',
          }}>
        {_context.parameters.buttonName.raw?.toString()}
      </Button>
    </div>
  );
}

const onButtonClick = async () => {

  const relatedEntityLogicalName = _context.parameters.relatedEntityLogicalName.raw?.toString() ?? "";
  const createEntityFromLogicalName = _context.parameters.createEntityFromLogicalName.raw?.toString() ?? "";
  const createEntityFromId = _context.parameters.createEntityFromId.raw?.toString() ?? "";
  const createEntityFromName = _context.parameters.createEntityFromName.raw?.toString() ?? "";  

  const entityFormOptions = {
    entityName: relatedEntityLogicalName,
    createFromEntity: {
      entityType: createEntityFromLogicalName,
      id: createEntityFromId,
      name: createEntityFromName
    },
    useQuickCreateForm: true
  }
  await _context.navigation.openForm(entityFormOptions)
}