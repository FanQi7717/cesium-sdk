const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // production：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。
  mode: "production",
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录对应绝对路径;  '/dist'
    filename: "cesium-sdk.min.js", //决定bundle输出名称
    library: {
      type: "module", //同output.libraryTarget, 配置如何暴露library（影响打包文件的导出方式：变量/对象/模块）
    },
    // umdNamedDefine: true, //当library.type为'umd'时，umdNamedDefine为true，将命名由umd构建的amd模块
  },
  experiments: {
    outputModule: true,
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
            // 生产环境，可以选择保留声明文件，不设置transpileOnly
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
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [new CleanWebpackPlugin()],
};
