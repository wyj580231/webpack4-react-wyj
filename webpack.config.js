const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const manifest = require("./public/dll/manifest.dll.json");
const publicPath = "/";
module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      filename: isDev ? "[name].js" : "[name].[hash:8].js",
      chunkFilename: "[name].[chunkhash:8].chunk.js",
      path: path.resolve("./dist"), //必须是绝对路径
      publicPath: publicPath
    },
    devtool: isDev ? "source-map" : false,
    resolve: {
      //自动补全后缀
      extensions: [".js", ".scss", ".css"],
      alias: {
        "@request": path.resolve(__dirname, "./src/utils/request.js"),
        utils: path.resolve(__dirname, "./src/utils"),
        components: path.resolve(__dirname, "./src/components")
      }
    },
    // 开发服务器
    devServer: {
      stats: "errors-only",
      historyApiFallback: true, //让所有404的页面定位到index.html
      contentBase: path.join(__dirname, "public"), //配置开发服务运行时的文件根目录
      host: "localhost",
      port: 8888,
      compress: true, // 服务器压缩
      open: true, // 自动打开浏览器
      hot: true, //热更新
      inline: true,
      proxy: {
        //通过代理解决本地跨域
        "/api": {
          target: "http://www.baidu.com/",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/"
          }
        }
      },
      clientLogLevel: "none" //关闭webpack控制台输出
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            // node_modules内的依赖库
            chunks: "all", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100 // 该配置项是设置处理的优先级，数值越大越优先处理
          },
          common: {
            // ‘src/js’ 下的js文件
            chunks: "all",
            test: /[\\/]src[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
            name: "common", // 生成文件名，依据output规则
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1
          }
        }
      },
      runtimeChunk: {
        name: "manifest"
      }
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.jsx?$/,
          loader: "source-map-loader",
          enforce: "pre"
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: ["happypack/loader?id=js"]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  "@primary-color": "#1899da",
                  "@font-family": "Arial, 微软雅黑"
                },
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["happypack/loader?id=css"]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: "url-loader",
          options: {
            limit: 8192,
            outputPath: "assets/",
            name: "[name].[hash:base64:8].[ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: "js",
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: isDev
            }
          }
        ],
        // 使用共享进程池中的子进程去处理任务
        threadPool: happyThreadPool
        // ... 其它配置项
      }),
      new HappyPack({
        id: "css",
        // 如何处理 .css 文件，用法和 Loader 配置中一样
        loaders: [
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[path][name]---[local]---[hash:base64:6]"
            }
          },
          {
            loader: "sass-loader"
          },
          "postcss-loader"
        ],
        threadPool: happyThreadPool
      }),
      // 用ExtractTextPlugin之后hot无效，所以开发模式下禁用
      new ExtractTextPlugin({
        disable: isDev,
        filename: isDev ? "style.css" : "index.[md5:contenthash:hex:20].css",
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        title: "wyj",
        favicon: "./favicon.ico",
        template: path.resolve(__dirname, "index.ejs"),
        inject: false,
        hash: false,
        dllJS: publicPath + `dll/${manifest.name.replace(/_/g, ".")}.js`,
        dllCSS: /\.css/g.test(JSON.stringify(manifest))
          ? publicPath + `dll/${manifest.name.replace(/_/g, ".")}.css`
          : false
      }),
      // 定义全局变量React指向react库就不用每次import react
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        React: "react",
        PropTypes: "prop-types",
        classnames: "classnames"
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./public/dll/manifest.dll.json")
      }),
      // css变化时不会影响js的hash，参看hash,chunkhash,contenthash的区别
      new WebpackMd5Hash(),
      new ManifestPlugin(),
      new CopyWebpackPlugin([
        {
          from: "./public",
          to: path.resolve(__dirname, "./dist"),
          toType: "dir"
        },
        {
          from: "./public/*",
          to: path.resolve(__dirname, "./dist")
        }
      ]),
      new CleanWebpackPlugin("./dist/*", {
        root: __dirname,
        verbose: false, //关闭日志
        dry: false
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
