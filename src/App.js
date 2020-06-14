import React, { useEffect, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';
import { appUrl, initialPdfCode } from './app.config';

import packageJson from '../package.json';

import './App.scss';
import pdfUrl from './pdf/initial-pdf.pdf';
import { checkSemverGreaterThan, refreshCacheAndReload } from './utils/cacheBusting';

const PdfContainer = loadable(() => import('./pdf/PdfContainer'));

function App() {
  const [code, setCode] = useState(JSON.stringify(initialPdfCode, null, 2));
  const [pdfEdited, setPdfEdited] = useState(false);

  useEffect(() => {
    fetch(appUrl + '/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = packageJson.version;

        const shouldForceRefresh = checkSemverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          refreshCacheAndReload();
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
        }
      });
  });

  const createPDF = (ev, pdfCode) => {
    ReactGA.event({
      category: 'Updating PDF',
      action: 'Updating PDF config',
    });

    setCode(pdfCode);
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
