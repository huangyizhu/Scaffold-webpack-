'use strict';

//此插件用于在html编译完成时自动刷新browsersync页面，防止hmr不会自动刷新

const browserSync = global.browserSync;

function HtmlWebpackReloadPlugin() {}

HtmlWebpackReloadPlugin.prototype.apply = function(compiler) {
    // Hook into the html-webpack-plugin emit
    compiler.plugin('compilation', function(compilation) {
        //无法停止在hmr过程中的编译
        // compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        //     const originalHTML = global[htmlPluginData.outputName],
        //         newHTML = htmlPluginData.html;
        //     if (originalHTML !== newHTML) {
        //         global[htmlPluginData.outputName.substring(0, htmlPluginData.outputName.lastIndexOf('.'))] = newHTML;
        //         callback(null);
        //     }
        // });
        compilation.plugin('html-webpack-plugin-after-emit', function(htmlPluginData, callback) {
            const originalHTML = global[htmlPluginData.outputName];
            const newHTML = htmlPluginData.html.source();
            if (originalHTML !== newHTML) {
                browserSync.reload();
                global[htmlPluginData.outputName] = newHTML;
            }
            callback();
        });
    });
};

module.exports = HtmlWebpackReloadPlugin;