const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production'

const cssExtract = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: !isProd ? '[name].css' : '[name].[hash].css',
    chunkFilename: !isProd  ? '[id].css' : '[id].[hash].css',
})


module.exports = {
  mode:isProd?'production':'none',
  devtool: isProd
      ? false
      : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // 代码混淆工具
        uglifyOptions: {
          warnings: false
        },
      }),
    ],
  },
  plugins: isProd
      ? [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        cssExtract
      ]
      : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        cssExtract
      ]
}
