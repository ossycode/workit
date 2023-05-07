const isDevelopment = process.env.NODE_ENV === "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",

      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader",
      //   ],
      // },

      {
        test: /\.module\.s(a|c)ss$/,

        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",

            options: {
              modules: true,

              sourceMap: isDevelopment,
            },
          },

          {
            loader: "sass-loader",

            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },

      {
        test: /\.s(a|c)ss$/,

        exclude: /\.module.(s(a|c)ss)$/,

        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,

          "css-loader",

          {
            loader: "sass-loader",

            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".scss"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, "./dist"),
  },
};
