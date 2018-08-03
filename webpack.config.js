const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

const html = new HtmlWebPackPlugin({ template: "./source/index.html" })

module.exports = {
  entry: "./source/index.js",
  output: {
    path: path.resolve("public"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      modules: path.resolve("node_modules")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [html]
}
