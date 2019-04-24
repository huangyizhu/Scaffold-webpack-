const glob = global.glob || require('glob');
const common = global.common || require('./common_config');
const path = global.path || require('path');
const hotDev = 'webpack/hot/dev-server';
const hotMiddle = 'webpack-hot-middleware/client?reload=true';

//自动扫描，同步读取config文件中的entry文件
let entries = {};
let privateEntries = [];
let loadEntries = () => {
    const entriesFilesPaths = [common.location.private, common.publicPath.config];
    entriesFilesPaths.forEach(function (entriesFilePath) {
        var files = glob.sync(path.resolve(entriesFilePath, "**/**/entry.*.js"), {
            nodir: true
        })
        files.forEach(function (file) {
            let pathName = file.toString();
            let fileName = pathName.substring(pathName.lastIndexOf("/") + 1);
            let chunkName = fileName.substring(fileName.indexOf(".") + 1, fileName.lastIndexOf("."));
            if (process.env.NODE_ENV === "developing") {
                entries[chunkName] = [hotDev, hotMiddle, pathName];
            } else {
                entries[chunkName] = pathName;
            }
            if (entriesFilePath === common.location.private) {
                privateEntries.push(chunkName);
            }
        })
    });
}

(function () {
    loadEntries();
})();

module.exports = {
    "entries": entries,
    "privateEntries": privateEntries
};