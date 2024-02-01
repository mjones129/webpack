const express = require('express');
const app = express();
const path = require('path');

if (process.env.NODE_ENV === 'dev') {
  console.log('development mode');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const configuration = require('../webpack/webpack.dev.config.js');
  const webpack = require('webpack');
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  )
}

app.get('/', function(req, res) {
  const absPath = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(absPath);
})

app.use('/static', express.static(path.resolve(__dirname, '../dist/')))

app.listen(3000, function () {
  console.log('App is on http://localhost:3000');
})
