const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // development：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
  mode: "development",
  entry: "./test/index.tsx",
  //devtool: "source-map"可build代码，但是速度最慢。
  devServer: {
    hot: true, //热模块：仅更新更改内容；修改js/css后，立即更新浏览器
    contentBase: path.join(__dirname, "./test/public"), //告诉服务器从哪里提供内容
  },
  module: {
    //创建模块时，匹配请求的规则数组。
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              // 关闭类型检查，只进行转译。
              // 类型检查交给fork-ts-checker-webpack-plugin在别的线程中做。
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true, //支持内联js
              },
              //   strictMath: true, // 是否严格匹配
              //   noIeCompat: true, //是否不兼容IE
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000240, //图片大小限制
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    //按顺序解析后缀名。生产模式下可以不配置.tsx、.jsx。
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./test/public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: true,
          global: true,
        },
      },
    }),
  ],
};
