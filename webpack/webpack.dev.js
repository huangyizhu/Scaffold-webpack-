const webpack = global.webpack || require("webpack");
const common = global.common || require("../config/common_config");
const HtmlWebpackReloadPlugin = require('./html_reload');
const path = global.path || require('path');

const config = {
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        root: path.resolve(__dirname, "../src/public"),
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, "postcss.config.js")
                        }
                    }
                }, {
                    loader: 'sass-loader',
                }
            ],
        }],
    },
    plugins: [
        //将html写入硬盘
        new HtmlWebpackReloadPlugin(),
        //以下均为hmr用plugins
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}

module.exports = config;