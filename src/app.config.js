export const initialPdfCode = {
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
