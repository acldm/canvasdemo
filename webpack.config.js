const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js'
  },
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({
    template: './config/template.html'
  })],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000
  }
}