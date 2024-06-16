const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return {
      context: path.resolve(__dirname, 'src'),
      entry: [
        './index.js'
      ],
      mode: 'production',
      output: {
        filename: '025a5a2862a30644633d838f2076f3f7.png',
        path: path.resolve(__dirname, 'build/prod'),
        publicPath: '/'
      },
      output: {
        filename: 'spambuster-bundle-prod.js',
        path: path.resolve(__dirname, 'build/prod'),
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'url-loader',
            options: {
              // Images larger than 10 KB won’t be inlined
              limit: 10 * 1024
            }
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'image-webpack-loader',
            // Specify enforce: 'pre' to apply the loader
            // before url-loader/svg-url-loader
            // and not duplicate it in rules with them
            enforce: 'pre'
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      optimization: {
        minimizer: [new TerserPlugin({
          extractComments: false
        })]
      }
    }
  } else {
    return {
      context: path.resolve(__dirname, 'src'),
      entry: [
        './index.js'
      ],
      mode: 'development',
      output: {
        filename: 'spambuster-bundle-dev.js',
        path: path.resolve(__dirname, 'build/dev'),
        publicPath: '/'
      },
      devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'build/dev'),
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'url-loader',
            options: {
              // Images larger than 10 KB won’t be inlined
              limit: 10 * 1024
            }
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'image-webpack-loader',
            // Specify enforce: 'pre' to apply the loader
            // before url-loader/svg-url-loader
            // and not duplicate it in rules with them
            enforce: 'pre'
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      optimization: {
        minimizer: [new TerserPlugin({
          extractComments: false
        })]
      }
    }
  }
}
