import React from 'react';
import Editor from '@monaco-editor/react';

const CodeContainer = (props) => {
  const { code, createPDF } = props;
  return (
    <div id='CodeContainer'>
      <Editor
        value={code}
        language='json'
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: true,
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
