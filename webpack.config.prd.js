const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  entry: './src/index.ts',
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Core: path.resolve(__dirname, 'src/core/'),
      Assets: path.resolve(__dirname, './assets/'),
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, './assets'),
    // contentBasePublicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: [/\.ts/, /\.tsx/],
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|wav)$/i,
        use: "file-loader"
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    new CopyPlugin({
      patterns:[
        {from: "assets", to: "assets"}
      ]
    })
  ],

  output: {
    // filename: `${getAppName()}/[name].bundle.[hash:8].js`,
    filename: 'paparcraft.bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
  },
};


module.exports = config;
