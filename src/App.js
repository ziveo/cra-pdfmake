import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ReactGA from 'react-ga';

import './App.scss';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const initialPdfCode = {
  watermark: {
    text: 'test watermark',
    opacity: 0.05,
    bold: true,
    italics: false,
  },
  info: {
    title: 'PDF Document',
    author: 'john doe',
    subject: 'subject of document',
    keywords: 'keywords for document',
  },
  content: [
    'First paragraph 123',
    'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
  ],
};

function App() {
  const [code, setCode] = useState(JSON.stringify(initialPdfCode, null, 2));
  const [pdfUrl, setPdfUrl] = useState(() => {
    ReactGA.event({
      category: 'Generating PDF',
      action: 'Generating initial PDF',
    });
    const pdfDocGenerator = pdfMake.createPdf(initialPdfCode);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setPdfUrl(dataUrl);
    });
  });

  const createPDF = (ev, pdfCode) => {
    ReactGA.event({
      category: 'Updating PDF',
      action: 'Updating PDF config',
    });

    const pdfDocGenerator = pdfMake.createPdf(JSON.parse(pdfCode));
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setPdfUrl(dataUrl);
    });
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
        <iframe id='PdfContainer__iframe' title='pdf-iframe' src={pdfUrl} frameBorder={0} />
      </div>
    </div>
  );
}

export default App;
