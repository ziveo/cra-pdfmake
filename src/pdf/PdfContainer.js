import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { initialPdfCode } from '../app.config';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfContainer = (props) => {
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

  useEffect(() => {
    const propCodeFormated = props.code;
    setCode(propCodeFormated);
    if (code !== propCodeFormated) {
      const pdfDocGenerator = pdfMake.createPdf(JSON.parse(props.code));
      pdfDocGenerator.getDataUrl((dataUrl) => {
        setPdfUrl(dataUrl);
      });
    }
  }, [props.code, code]);

  return (
    <div id='PdfContainer__edited'>
      <iframe id='PdfContainer__iframe' title='pdf-iframe' src={pdfUrl} frameBorder={0} />
    </div>
  );
};

export default PdfContainer;
