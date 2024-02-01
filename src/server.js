const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
  const absPath = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(absPath);
})

app.use('/static', express.static(path.resolve(__dirname, '../dist/')))

app.listen(3000, function () {
  console.log('App is on http://localhost:3000');
})
