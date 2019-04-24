//导入工具包 require('node_modules里对应模块')
const gulp = require('gulp'), //本地安装gulp所用到的地方
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    webpack = require('webpack'),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    proxy = require('http-proxy-middleware'),
    del = require('del'),
    assign = require('./util/assign_object');

let browserSync = require("browser-sync").create();

const loadingConfig = () => {
    global.path = require('path'),
        global.common = require('./config/common_config'),
        global.entries = require('./config/entries_config').entries,
        global.pages = require('./config/pages_config'),
        global.webpack = require('webpack'),
        global.browserSync = browserSync;
    if (process.env.NODE_ENV === "developing") {
        return {
            devConfig: require('./webpack/webpack.dev'),
            originalConfig: require('./webpack/webpack.config'),
            devServerConfig: require('./webpack/devServer'),
            hotMiddleware: require('./webpack/hotMiddleware'),
        }
    } else if (process.env.NODE_ENV === "building") {
        return {
            buildConfig: require('./webpack/webpack.build'),
            originalConfig: require('./webpack/webpack.config'),
        }
    };
}

gulp.task('plugins', () => {
    console.log(plugins);
});

gulp.task('dev', () => {
    process.env.NODE_ENV = 'developing';
    let serverConfig = loadingConfig();
    let webpackConfig = assign(serverConfig.devConfig, serverConfig.originalConfig);
    let bundler = webpack(webpackConfig);
    // const middlewareProxy1 = proxy('/clock/', {
    //     "target": 'http://10.11.3.205:8080',
    //     "secure": false,
    //     "changeOrigin": true,
    // });
    // const middlewareProxy2 = proxy('/seat/', {
    //     "target": 'http://10.11.3.205:8080',
    //     "secure": false,
    //     "changeOrigin": true,
    // });
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [
                webpackDevMiddleware(bundler, serverConfig.devServerConfig),
                webpackHotMiddleware(bundler, serverConfig.hotMiddleware),
                // middlewareProxy1,
                // middlewareProxy2
            ],
        },
        online: false,
        port: 80,
        // ghostMode: false,
        open: false,
    });

});

gulp.task('reload', () => {
    console.log("browser reload");
});

gulp.task('build', ['clean'], () => {
    process.env.NODE_ENV = 'building';
    const produceConfig = loadingConfig();
    const webpackConfig = assign(produceConfig.buildConfig, produceConfig.originalConfig);
    const bundler = webpack(webpackConfig);
    bundler.run((err, stats) => {
        if (err) {
            console.log(err);
        }
        gulp.src('dist/*.html')
            .pipe(plugins.htmlmin({
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            }))
            .pipe(gulp.dest('dist'));
    });
})

gulp.task('clean', () => {
    del.sync("./dist");
})