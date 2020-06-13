import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';
import { initialPdfCode } from './app.config';

import './App.scss';

const PdfContainer = loadable(() => import('./pdf/PdfContainer'));

function App() {
  const [code, setCode] = useState(JSON.stringify(initialPdfCode, null, 2));

  const createPDF = (ev, pdfCode) => {
    ReactGA.event({
      category: 'Updating PDF',
      action: 'Updating PDF config',
    });

    setCode(pdfCode);
  };

  return (
    <div className='App'>
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
      <PdfContainer code={code} />
    </div>
  );
}

export default App;
