const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './lib/index.js',
  mode: 'development',
  output: {
    filename: 'qrcode-scan.js',
    path: __dirname + '../dist',
    libraryTarget: 'this',
    library: 'qrcodeScan',
    libraryExport: "default"
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    }, {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    }]
  },
  devServer: {
    hot: false,
    https: true,
    host: '0.0.0.0',
    port: '8001',
    open: false,
    publicPath: '/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};