const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


module.exports = env => {
  const assetsPath = '/assets/';
  return {
    target: 'web',
    entry: {
      bundle: './src/index.js',
    },
    mode: env.development ? "development" : "production",
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, '../../build/assets')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            maxSize: 300000,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      alias: {
        Actions: path.resolve(__dirname, '../../src/store/actions/'),
        Components: path.resolve(__dirname, '../../src/components/'),
        Pages: path.resolve(__dirname, '../../src/pages/'),
        Server: path.resolve(__dirname, '../../src/server/'),
        History: path.resolve(__dirname, '../../src/history/'),
        Utils: path.resolve(__dirname, '../../src/utils/'),
        Styles: path.resolve(__dirname, '../../src/styles/'),
        AppConstants: path.resolve(__dirname, '../../src/app-consts/')
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            publicPath: 'assets',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.(?:css|scss)$/,
          exclude: '/node_modules/',
          use: [{
            loader: ExtractCssChunks.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          }, 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '$assetsPath: "' + assetsPath + '";'
            }
          },
          ],
        },
      ],
    },
    plugins: [
      new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
        filename: '[name].[hash].css',
      // chunkFilename: "[id].css",
      // hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      // orderWarning: true, // Disable to remove warnings about conflicting order between imports
      // reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      // cssModules: true // if you use cssModules, this can help.
      }),
      new WebpackManifestPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../../public/'),
            to: path.resolve(__dirname, '../../build/assets'),
          }
        ],
      }),
      new CaseSensitivePathsPlugin(),
    ],
  };
};
