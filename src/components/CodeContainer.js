import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

const CodeContainer = (props) => {
  const { code, createPDF } = props;
  return (
    <div id='CodeContainer'>
      <ControlledEditor
        value={code}
        language='json'
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          formatOnPaste: true,
          formatOnType: true,
        }}
        onChange={createPDF}
      />
    </div>
  );
};

export default CodeContainer;
