// vue.config.js
module.exports = {
    devServer: {
      port: 8090,
      proxy: {
        "^/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          logLevel: "debug",
          pathRewrite: { "^/api": "" }
        }
    }
  }
}