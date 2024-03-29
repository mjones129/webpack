const express = require('express');
const app = express();
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

if (process.env.NODE_ENV === 'dev') {
  console.log('development mode');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const configuration = require('../webpack/webpack.dev.config.js');
  const webpack = require('webpack');
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  )

  const webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.get('/', function(req, res) {
  const absPath = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(absPath);
})

app.use('/static', expressStaticGzip(path.resolve(__dirname, '../dist/')))

app.listen(3000, function () {
  console.log('App is on http://localhost:3000');
})
