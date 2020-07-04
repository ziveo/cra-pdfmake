const posthtml = require('posthtml');
const inline = require('posthtml-inline-assets');
const path = require('path');
const fs = require('fs');

const buildPath = path.join(__dirname, '../', '/build/index.html');
// const destPath = path.join(__dirname, '../', '/dest/index.html');
const html = fs.readFileSync(buildPath, 'utf-8');

posthtml([
  inline({
    cwd: path.join(__dirname, '../', '/build'),
  }),
])
  .process(html)
  .then((result) => {
    fs.writeFileSync(buildPath, result.html);
  });
