const common = global.common || require('../config/common_config');

const devServer = {
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    historyApiFallback: true,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
    proxy: {
        "/mock": "http://localhost:8081",
    },
    disableHostCheck: true,
    contentBase: common.location.dist,
    publicPath: 'http://0.0.0.0/',
}

module.exports = devServer;