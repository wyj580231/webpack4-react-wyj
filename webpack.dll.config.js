const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //清空
module.exports = {
  mode: "production",
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router-dom",
      "prop-types",
      "isomorphic-fetch",
      "@babel/polyfill"
    ]
  },
  output: {
    path: path.resolve(__dirname, "./public/dll"),
    filename: "dll.[name].[chunkhash].js",
    library: "dll_[name]_[chunkhash]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: false
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: false
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "./public/dll", "manifest.dll.json"),
      name: "dll_[name]_[chunkhash]",
      context: __dirname
    }),
    new ExtractTextPlugin({
      filename: "dll.[name].[chunkhash].css",
      allChunks: true
    }),
    new CleanWebpackPlugin("./public/dll/*", {
      root: __dirname, //根目录
      verbose: false, //关闭日志
      dry: false
    })
  ]
};
