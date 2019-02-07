const path = require('path');
const webpack = require('webpack');
//const Copy = require('copy-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = 
{
    name: 'bloccoly',
    module: {
        noParse: /\/NativeRequire.js$/,
    },
    externals: [
        /(boards|packages|plugins|platforms)\/.*?\(config\.js|\.vue)/i,
        function(context, request, callback) {
            if (/(boards|packages|plugins|platforms).*?\/.*?(config\.js|\.vue)$/.test(request)){
                console.log(request);
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ]
};