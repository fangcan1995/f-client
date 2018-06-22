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
    //host:"172.16.4.5",
    // host: "172.16.1.224"
    //host:"172.16.6.2",
    //port: 4800,
};

module.exports = developmentConfig;