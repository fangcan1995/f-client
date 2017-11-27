const webpack = require('webpack');
const path = require('path');
const extend = require('extend');
const config = require('./webpack.config.js');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

let developmentConfig = extend(true, {}, config);
developmentConfig.plugins = developmentConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
]);
developmentConfig.devtool = 'eval-source-map';
developmentConfig.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 9002,
};
module.exports = developmentConfig;