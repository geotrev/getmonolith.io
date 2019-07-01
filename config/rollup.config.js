import { uglify } from "rollup-plugin-uglify"
import pkg from "../package.json"
import path from "path"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import banner from "./banner"

// Base configurations for all bundles

const inputs = {
  umd: path.resolve(__dirname, "../js/src/index.bundle.js"),
}

const outputs = {
  umd: path.resolve(__dirname, "../dist/undernet.bundle.js"),
  umdMin: path.resolve(__dirname, `../dist/undernet.bundle.min.js`),
}

const plugins = [
  resolve(),
  babel({
    exclude: "node_modules/**",
    comments: false,
  }),
]

/**
 * UMD bundle
 **/

const umdOutput = {
  file: outputs.umd,
  format: "umd",
  name: pkg.name,
  sourcemap: true,
  exports: "named",
  banner,
}

const umdBundle = {
  input: inputs.umd,
  output: umdOutput,
  plugins,
}

/**
 * UMD bundle (minified)
 **/

const umdMinOutput = Object.assign({}, umdOutput, {
  file: outputs.umdMin,
})

const umdMinPlugins = []
umdMinPlugins.push(
  ...plugins,
  uglify({
    output: {
      comments: (node, comment) => {
        if (comment.type === "comment2") {
          return /@preserve|@license|@cc_on/i.test(comment.value)
        }
        return false
      },
    },
    mangle: { reserved: ["Undernet"] },
  })
)

const umdMinBundle = {
  input: inputs.umd,
  output: umdMinOutput,
  plugins: umdMinPlugins,
}

module.exports = [umdBundle, umdMinBundle]
