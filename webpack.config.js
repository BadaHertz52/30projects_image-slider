const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: 'source-map',
  mode: "development",
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "image-slider-project",
      template: "./index.html",
      inject: "body",
      favicon: "./favicon.png"
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'image/[name][ext]'
        }
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
};
