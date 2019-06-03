const fs = require('fs');
let path = require('path')

const obj = {};
fs.readdirSync('./config').forEach(file => {
  if (file === '.' || file === '..')
    return;

  if (path.extname(file) !== '.json')
    return;
  var fileName = path.basename(file, '.json');
  obj[fileName] = JSON.parse(fs.readFileSync(path.join('config', file)));
});

Object.freeze(obj);
module.exports = obj;