module.exports = {
  entry: './lib/index.js',
  mode: 'production',
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
  }
};