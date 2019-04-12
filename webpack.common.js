const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
  entry: {
    polyfill: path.resolve(__dirname, "site/polyfill.js"),
    main: path.resolve(__dirname, "site/index.js"),
  },
  output: {
    filename: data => {
      return data.chunk.name === "polyfill" ? "[name].js" : "[name].[chunkhash].js"
    },
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      projectRoot: path.resolve(__dirname),
      routes: path.resolve(__dirname, "site/routes"),
      components: path.resolve(__dirname, "site/components/"),
      helpers: path.resolve(__dirname, "site/helpers/"),
      pages: path.resolve(__dirname, "site/pages/"),
      assets: path.resolve(__dirname, "site/assets/"),
      docs: path.resolve(__dirname, "site/docs/"),
      undernet: path.resolve(__dirname, "js/dist/index"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader?cacheDirectory",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: { config: { path: "config/postcss.config.js" } },
          },
          "resolve-url-loader",
          "sass-loader?sourceMap",
        ],
      },
      {
        test: /\.(ico|png|jpe?g|gif|eot|svg|ttf|woff2?|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]", outputPath: "assets/" },
          },
        ],
      },
      {
        test: /\.md$/,
        use: ["html-loader", "markdown-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      excludeChunks: ["polyfill"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
}
