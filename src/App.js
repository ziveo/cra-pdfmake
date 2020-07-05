import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';

import { initialPdfCode } from './app.config';
import { cacheBusting } from './utils/cacheBusting';
import packageJson from '../package.json';

import pdfImage from './images/initial-pdf.jpg';

import './App.scss';
import JSON5 from 'json5';
import InitialPdf from './pdf/InitialPdf';

const CodeContainer = loadable(() => import('./components/CodeContainer'));
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
      label: `App version ${packageJson.version}`,
    });

    setCode(jsonString);
    setPdfEdited(true);
  };

  return (
    <>
      <header>
        <div className='title__container'>
          <h1 id='App__title'>PDF Maker</h1>
          <sub id='App__version'>v{packageJson.version}</sub>
        </div>
        <nav>
          <button className='edit__button' onClick={() => setPdfEdited(true)}>
            EDIT
          </button>
        </nav>
      </header>
      <div className='App'>
        {pdfEdited && <CodeContainer code={code} createPDF={createPDF} />}

        <div id='PdfContainer'>
          {!pdfEdited ? (
            <div id='PdfContainer__iframe'>
              <div className='PdfContainer__initial-image' onClick={() => setPdfEdited(true)}>
                <InitialPdf />
              </div>
            </div>
          ) : (
            <PdfContainer code={code} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
