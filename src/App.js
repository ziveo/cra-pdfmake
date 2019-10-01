import React from "react";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./App.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const dd = {
  watermark: {
    text: "test watermark",
    opacity: 0.1,
    bold: true,
    italics: false
  },
  content: [
    "First paragraph",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
  ]
};

const downloadPDF = () => {
  pdfMake.createPdf(dd).open();
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="App-link" onClick={() => downloadPDF()}>
          Download PDF
        </span>
      </header>
    </div>
  );
}

export default App;
