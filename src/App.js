import React, { Component } from "react";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./App.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const containerStyling = { width: 600, height: 950, backgroundColor: "#ccc" };

const pdf = {
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

  componentDidMount = () => {
    const pdfDocGenerator = pdfMake.createPdf(pdf);
    pdfDocGenerator.getDataUrl(dataUrl => {
      this.setState({ pdfUrl: dataUrl });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <div id="CodeContainer" style={containerStyling} />
          <iframe
            title="pdf-iframe"
            src={this.state.pdfUrl}
            style={containerStyling}
            frameBorder={0}
          />
        </div>
      </div>
    );
  }
}

export default App;
