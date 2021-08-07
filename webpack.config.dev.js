const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // development：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
  // production：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录对应绝对路径;  '/dist'
    filename: "cesium-sdk.min.js", //决定bundle输出名称
  },
  module: {
    //创建模块时，匹配请求的规则数组。
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [],
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
      checkSyntacticErrors: true,
    }),
  ],
};
