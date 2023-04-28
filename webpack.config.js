/** @format */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMessages = require("./src/common/webpackMsgUtils");

// region CONFIG CONSTANTS
const PORT = 3000;
// endregion CONFIG CONSTANTS

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/"),
  },
  devServer: {
    port: PORT,
    static: { directory: path.join(__dirname, "public/"), publicPath: "/" },
    hot: true,
    open: false,
    historyApiFallback: true,
  },
  plugins: [
    new WebpackMessages({
      port: PORT,
      name: "client",
      logger: (str) => {
        console.log(`>>> ${str}`);
      },
    }),
    new HtmlWebpackPlugin({ template: "public/index.html", filename: "index.html", inject: true }),
  ],
  stats: "errors-only",
};
