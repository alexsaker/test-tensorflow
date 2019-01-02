const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/main.ts")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  target: "node",
  watch: true,
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: true, // if you don't put this is, __dirname
    __filename: true // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: { scripts: ["rm -rf dist/*"] },
      onBuildEnd: {
        scripts: ["npm run serve"]
      }
    })
  ]
};
