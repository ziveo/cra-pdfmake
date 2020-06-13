import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';
import { initialPdfCode } from './app.config';

import './App.scss';
import pdfUrl from './pdf/initial-pdf.pdf';

const PdfContainer = loadable(() => import('./pdf/PdfContainer'));

function App() {
  const [code, setCode] = useState(JSON.stringify(initialPdfCode, null, 2));
  const [pdfEdited, setPdfEdited] = useState(false);

  const createPDF = (ev, pdfCode) => {
    ReactGA.event({
      category: 'Updating PDF',
      action: 'Updating PDF config',
    });

    setCode(pdfCode);
    setPdfEdited(true);
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

      <div id='PdfContainer'>
        {!pdfEdited ? (
          <iframe id='PdfContainer__iframe' title='pdf-iframe' src={pdfUrl} frameBorder={0} />
        ) : (
          <PdfContainer code={code} />
        )}
      </div>
    </div>
  );
}

export default App;
