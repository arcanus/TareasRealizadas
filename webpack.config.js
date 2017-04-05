var ExtractTextPLugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    './js/vendor.js',
    './js/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  module: {
    rules: [{
      test: /\.css$/,
      //use: ['style-loader','css-loader']
      use: ExtractTextPLugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPLugin('styles.css'),
  ]
};
