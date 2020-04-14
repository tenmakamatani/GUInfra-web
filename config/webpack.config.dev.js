"use strict";

const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        inline: true,
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            }
        },
    }
})