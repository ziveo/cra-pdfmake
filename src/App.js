import React, { Component } from "react";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./App.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfCode = {
  watermark: {
    text: "test watermark",
    opacity: 0.05,
    bold: true,
    italics: false
  },
  info: {
    title: "PDF Document",
    author: "john doe",
    subject: "subject of document",
    keywords: "keywords for document"
  },
  content: [
    "First paragraph",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
  ]
};

class App extends Component {
  state = {
    code: JSON.stringify(pdfCode, null, 2),
    pdfCode: pdfCode,
    pdfUrl: null
  };

  componentDidMount = () => {
    this.createPDF(pdfCode);
  };

  createPDF = pdfCode => {
    const pdfDocGenerator = pdfMake.createPdf(pdfCode);
    pdfDocGenerator.getDataUrl(dataUrl => {
      this.setState({ pdfUrl: dataUrl });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <div id="CodeContainer">
            <textarea
              value={this.state.code}
              onChange={event => {
                const value = event.target.value;
                this.createPDF(JSON.parse(value));
                this.setState({ code: value });
              }}
            />
          </div>
          <iframe
            id="PdfContainer"
            title="pdf-iframe"
            src={this.state.pdfUrl}
            frameBorder={0}
          />
        </div>
      </div>
    );
  }
}

export default App;
