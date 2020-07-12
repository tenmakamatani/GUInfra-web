const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@public": path.resolve(__dirname, "./public/"),
      "@libs": path.resolve(__dirname, "./src/libs/"),
      "@modules": path.resolve(__dirname, "./src/modules/"),
      "@views": path.resolve(__dirname, "./src/views/"),
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loaders: ["url-loader"]
      },
      {
        test: /\.svg$/,
          use: {
            loader: "svg-url-loader",
            options: {
              noquotes: true
            }
          }
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    open: true,
    historyApiFallback: true
  }
};