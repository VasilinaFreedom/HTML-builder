const fs = require('fs');
const path = require('path');
const { stdout } = process;
const input = fs.createReadStream(path.join(__dirname, 'text.txt'));
input.on('data', data => stdout.write(data));