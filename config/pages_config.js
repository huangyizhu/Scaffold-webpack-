const glob = global.glob || require('glob');
const common = global.common || require('./common_config');
const path = global.path || require('path');

//自动扫描，同步读取config文件中的page配置文件
let pages = [];
let loadPages = () => {
    const pagesFilesPaths = [common.location.private, common.publicPath.config];
    pagesFilesPaths.forEach(function(entriesFilePath) {
        var files = glob.sync(path.resolve(entriesFilePath, "**/**/page.*.js"), { nodir: true })
        files.forEach(function(file) {
            const pageConfig = require(file);
            if (!(JSON.stringify(pageConfig) === '{}')) { //是否判断空对象
                pages.push(pageConfig);
            } else {
                const pathName = file.toString();
                const fileName = pathName.substring(pathName.lastIndexOf("/") + 1);
                console.warn("---请注意---\n" + fileName + "没有配置page信息\n---不会通过webpack打包---");
            }
        })
    });
}

(function() {
    loadPages();
})();

module.exports = pages;