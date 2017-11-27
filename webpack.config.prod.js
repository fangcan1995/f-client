const webpack = require('webpack');
const path = require('path');
const extend = require('extend');
const config = require('./webpack.config.js');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

let productionConfig = extend(true, {}, config);


productionConfig.plugins = productionConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin(GLOBALS)
]);
productionConfig.devtool = false;
module.exports = productionConfig;