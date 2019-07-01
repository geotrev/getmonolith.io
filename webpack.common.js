const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    main: path.resolve(__dirname, "app/index.js"),
  },
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      projectRoot: path.resolve(__dirname),
      routes: path.resolve(__dirname, "app/routes"),
      components: path.resolve(__dirname, "app/components/"),
      helpers: path.resolve(__dirname, "app/helpers/"),
      pages: path.resolve(__dirname, "app/pages/"),
      assets: path.resolve(__dirname, "app/assets/"),
      docs: path.resolve(__dirname, "app/docs/"),
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
          {
            loader: "css-loader",
            options: { importLoaders: 2 },
          },
          {
            loader: "postcss-loader",
            options: { config: { path: "config/postcss.config.js" } },
          },
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json",
        cache: true,
      },
      {
        from: "public/browserconfig.xml",
        to: "browserconfig.xml",
        cache: true,
      },
      {
        from: "public/static/**/*",
        to: "assets/[name].[ext]",
        cache: true,
      },
    ]),
  ],
}
