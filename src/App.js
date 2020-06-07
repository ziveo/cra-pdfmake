import React, { useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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
    const pdfDocGenerator = pdfMake.createPdf(initialPdfCode);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setPdfUrl(dataUrl);
    });
  });

  const createPDF = (pdfCode) => {
    const pdfDocGenerator = pdfMake.createPdf(JSON.parse(pdfCode));
    pdfDocGenerator.getDataUrl((dataUrl) => {
      setPdfUrl(dataUrl);
    });
  };

  return (
    <div className='App'>
      <div className='App-content'>
        <div id='CodeContainer'>
          <ControlledEditor
            height='90vh'
            value={code}
            language='json'
            options={{
              wordWrap: 'on',
              minimap: {
                enabled: false
              }
            }}
            onChange={(ev, value) => {
              createPDF(value);
            }}
          />
        </div>
        <div id='PdfContainer'>
          <iframe id='PdfContainer__iframe' title='pdf-iframe' src={pdfUrl} frameBorder={0} />
        </div>
      </div>
    </div>
  );
}

export default App;
