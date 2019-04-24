const fs = global.fs || require('fs');

const fileExist = (path) => {
    try {
        fs.accessSync(path);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = fileExist;