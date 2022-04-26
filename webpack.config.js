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
        filename: '[name]-bundle-prod.js',
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
        filename: '[name]-bundle-dev.js',
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
