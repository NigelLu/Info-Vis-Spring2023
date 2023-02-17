/** @format */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    port: 3000,
    static: { directory: path.join(__dirname, "public/"), publicPath: "/" },
    hot: true,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html", filename: "index.html", inject: true }),
  ],
};
