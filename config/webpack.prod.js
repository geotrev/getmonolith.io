const path = require("path")
const merge = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const common = require("../webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    runtimeChunk: {
      name: "manifest",
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: { path: "config/postcss.config.js" },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  stats: { children: false },
  plugins: [
    // remove previous build assets
    new CleanWebpackPlugin(["../build"], {
      root: path.resolve(__dirname),
      verbose: true,

      // external is required because this config is not in the root directory.
      allowExternal: true,
    }),

    // create gzip assets
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: "gzip",
    }),

    // copy app manifest + browserconfig from public/ to build/
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
    ]),
  ],
  mode: "production",
})
