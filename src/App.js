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
  state = {
    pdfUrl: null
  };

  downloadPDF = () => {
    const pdfDocGenerator = pdfMake.createPdf(dd);
    pdfDocGenerator.getDataUrl(dataUrl => {
      this.setState({ pdfUrl: dataUrl });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className="App-button" onClick={() => this.downloadPDF()}>
            Click to see PDF
          </button>
          <iframe
            title="pdf-iframe"
            src={this.state.pdfUrl}
            style={{ width: 400, height: 650, backgroundColor: "#ccc" }}
          />
        </header>
      </div>
    );
  }
}

export default App;
