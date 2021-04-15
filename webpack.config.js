const path = require('path')
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000
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
    }),
    new CopyWebpackPlugin({
      patterns : [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
  ],
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  }
}
module.exports = [demoConfig, pluginConfig]