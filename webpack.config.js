const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const PATHS ={
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var common = {
  //Entry accepts a path or an object of entries.
  // we'll be using the latter form given it's
  // convenient with more complex configurations.

  entry: {
    app: PATHS.app
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack demo'
    })
  ]
};

var config;
//Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event){
  case 'build':
    config = merge(common, {});
    break;
    default:
      config = merge(
        common, 
        parts.devServer({
          //Customize host/port here if needed
          host: process.env.HOST,
          port: process.env.PORT
        })
      ); 
}

module.exports = validate(config);