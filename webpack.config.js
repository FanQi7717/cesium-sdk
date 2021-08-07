const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // development：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
  // production：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录对应绝对路径;  '/dist'
    filename: "cesium-sdk.min.js", //决定bundle输出名称
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [new CleanWebpackPlugin()],
};
