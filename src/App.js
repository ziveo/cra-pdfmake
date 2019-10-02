import React, { Component } from "react";
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
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
  ]
};

class App extends Component {
  constructor() {
    super();

    this.iframeRef = React.createRef();
    this.state = {
      pdfUrl: null
    };
  }

  downloadPDF = () => {
    console.log(this.iframeRef);
    const pdfDocGenerator = pdfMake.createPdf(dd);
    pdfDocGenerator.getDataUrl(dataUrl => {
      this.setState({ pdfUrl: dataUrl });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-link" onClick={() => this.downloadPDF()}>
            Show PDF
          </span>
          <iframe
            title="pdf-iframe"
            src={this.state.pdfUrl}
            frameBorder="0"
            ref={this.iframeRef}
            style={{ width: 400, height: 650, backgroundColor: "#ccc" }}
          />
        </header>
      </div>
    );
  }
}

export default App;
