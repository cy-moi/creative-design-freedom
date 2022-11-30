const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const config = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Core: path.resolve(__dirname, 'src/core/'),
      Assets: path.resolve(__dirname, './assets/'),
    },
    extensions: ['.js', '.tsx'],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './assets'),
    contentBasePublicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx/, /\.tsx/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
      // {
      //   test: /\.(gif|png|jpe?g|svg|xml|wav)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '/public/assets/[name].[ext]',
      //     // publicPath: 'assets',
      //     // outputPath: 'assets',
      //   },
      // },
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
    new CopyPlugin([
      {
        from: './assets',
        to: './assets',
      },
    ]), // new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     maxInitialRequests: 5,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         priority: -9
  //       },
  //     }
  //   }
  // },
  output: {
    // filename: `${getAppName()}/[name].bundle.[hash:8].js`,
    filename: 'paparcraft.bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
  },
};

// const speedMeasure = new SpeedMeasurePlugin();
// module.exports = speedMeasure.wrap(config)

module.exports = config;
