const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: './src/javascripts/app.jsx'
  },
  output: {
    path: __dirname + '/docs',
    filename: 'javascripts/[name].js'
  },
  resolve: {
    alias: {
      normalize: __dirname + '/node_modules/normalize.css/'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ["env", { "modules": false }],
            'react'
          ]
        }
      }, 
      {
        test: /\.css$/, 
        use: [ 
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "file-loader" 
      },
      {
        test: /\.json$/,
        loader: "json-loader" 
      },
      {
        test: /\.yaml$/,
        use: [
          'file-loader',
          'json-loader',         
          'yaml-loader'
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.md$/,
        use: [
          'markdown-with-front-matter-loader'
        ]
      }
    ]
  },

  node: {
    console: true,
    fs: "empty"
  },

  devtool: PRODUCTION ? false : 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_URL: PRODUCTION ? JSON.stringify('https:/tksupercollider.github.io/') : JSON.stringify('/'),
      ASSET_URL: PRODUCTION ? JSON.stringify('https://raw.githubusercontent.com/tksupercollider/tksupercollider.github.io/master/') : JSON.stringify('/')
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery"
    }),
    new copyWebpackPlugin(
      [
        { from: './src/', to: './' }
      ],
      {
        ignore:
        [
          '.DS_Store',
          '.gitkeep',
          'javascripts/components/**/*',
          'javascripts/lib/*',
          'stylesheets/sass/*',
          'javascripts/app.jsx'
        ]
      }
    ),
    ...(
      PRODUCTION ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
      ] : []
    )
  ]
};
