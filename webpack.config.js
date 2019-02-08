const path = require('path');
const webpack = require('webpack');
var ExternalsPlugin = require('webpack-externals-plugin');
//const Copy = require('copy-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = 
{
    name: 'bloccoly',
    plugins: [
        new ExternalsPlugin({
            type: 'commonjs',
            include: __dirname + '/packages'
        }),
    ]
};