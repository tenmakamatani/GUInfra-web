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
      "@libs": path.resolve(__dirname, "./src/libs/"),
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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