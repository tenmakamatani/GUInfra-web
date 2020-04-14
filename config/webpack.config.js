"use strict";

const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/client/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "$types": path.resolve(__dirname, "../src/client/types/"),
            "$modules": path.resolve(__dirname, "../src/client/modules/")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [htmlWebpackPlugin]
};