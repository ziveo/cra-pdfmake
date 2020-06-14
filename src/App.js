import React, { useEffect, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';

import { initialPdfCode } from './app.config';
import { cacheBusting } from './utils/cacheBusting';
import packageJson from '../package.json';

import pdfUrl from './pdf/initial-pdf.pdf';

import './App.scss';
import JSON5 from 'json5';

const PdfContainer = loadable(() => import('./pdf/PdfContainer'));

function App() {
  const [code, setCode] = useState(JSON.stringify(initialPdfCode, null, 2));
  const [pdfEdited, setPdfEdited] = useState(false);

  useEffect(() => {
    cacheBusting();
  }, []);

  const createPDF = (ev, pdfCode) => {
    const jsonObject = JSON5.parse(pdfCode);
    const jsonString = JSON.stringify(jsonObject, null, 2);

    ReactGA.event({
      category: 'Updating PDF',
      action: 'Updating PDF config',
    });

    setCode(jsonString);
    setPdfEdited(true);
  };

  return (
    <>
      <header>
        <h1 id='App__title'>PDF Maker</h1>
        <sub id='App__version'>v{packageJson.version}</sub>
      </header>
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
    </>
  );
}

export default App;
