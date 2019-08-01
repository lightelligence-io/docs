const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {

  var CONFIG = {
    mode: "production",
    entry: {
      app: "./assets/js/index.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        ENVIRONMENT: JSON.stringify(env.NODE_ENV)
      }),
      new CleanWebpackPlugin(["./assets/output"], {
        root: __dirname,
        verbose: true,
        dry: false,
        allowExternal: true
      }),
      new MiniCssExtractPlugin({
        filename: "css/app.css"
      })
    ],
    output: {
      path: path.resolve(__dirname, "assets/output"),
      filename: "js/[name].js" // string
    },
    resolve: {
      extensions: ['.*', '.js', '.json', '.scss', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: env.NODE_ENV === 'development'
              }
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                minimize: true || {
                  discardComments: {
                    removeAll: true
                  },
                  minifyFontValues: false,
                  autoprefixer: false
                }
              }
            },
            'postcss-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "/fonts",
                name: "[name].[ext]",
                outputPath: "./../../static/fonts/"
              }
            }
          ]
        }
      ]
    }
  };

  return CONFIG;
};
