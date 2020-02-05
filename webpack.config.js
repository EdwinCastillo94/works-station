const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const webpack = require('webpack')

// const styleExtractor = new ExtractTextPlugin({
//   filename: '[name].css',
//   disable: process.env.NODE_ENV !== 'production',
// })
//
const deployEnvironment = 'development' //process.env.NODE_ENV || 'development'

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './out'),
    filename: `app.js?${Math.random()}`,
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './out'),
    port: process.env.PORT,
    host: '0.0.0.0',
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true,
    },
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RedWes',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: deployEnvironment
    }),
    new FaviconsWebpackPlugin('./src/assets/logo-isotipo.png'),
  ],
  resolve: {
    alias: {
      // _styles: path.resolve(__dirname, './styles'),
      _assets: path.resolve(__dirname, './src/assets'),
    },
    symlinks: false,
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
      // path.resolve(__dirname, 'styles'),
    ],
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        honorPackage: true,
        exclude: /node_modules/,
        transformFn(dirName) {
          return [`${dirName}.jsx`, `${dirName}.js`]
        },
      }),
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'stage-2',
            'react',
          ],
          ignore: /node_modules/,
        },
      }],
    }, {
      test: /\.(sass|scss|css)$/,
      exclude: [/node_modules/, /styles/],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            camelCase: true,
            modules: true,
            sourceMap: true,
            localIdentName: '[name]___[local]',
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [
              path.resolve(__dirname, 'src'),
            ],
          },
        },
      ],
    }, {
      test: /\.(sass|scss|css)$/,
      include: [/node_modules/, /styles/],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            camelCase: true,
            modules: true,
            localIdentName: '[local]',
          },
        },
        'sass-loader',
      ],
    }, {
      test: /\.(png|jpe?g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }],
  },
}
