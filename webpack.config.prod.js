const webpack = require('webpack');
const path = require('path');
const extend = require('extend');
const config = require('./webpack.config.js');

let productionConfig = extend(true, {}, config);

productionConfig.plugins = productionConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    })
]);
productionConfig.devtool = false;
module.exports = productionConfig;