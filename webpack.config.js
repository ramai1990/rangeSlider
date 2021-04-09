const path = require('path')
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const pluginConfig = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/RangeSlider/RangeSlider.js',
  output: {
    filename: `plugin/js/range-slider.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
}

const demoConfig = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: './demo/index.js',
  output: {
    filename: `${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/demo/index.pug'),
      filename: 'index.html',
      scriptLoading: "blocking"
    }),
    new MiniCssExtractPlugin({
      filename: `plugin/css/[name].css`
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  }
}

module.exports = [demoConfig, pluginConfig]