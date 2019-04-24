const path = global.path || require('path');

const pageName = {
    "main": "main",
    "send": "send",
}

const fileType = {
    "html": "html",
    "css": "css",
    "js": "js",
}

const location = {
    "src": path.resolve(__dirname, "../", "src"),
    "dist": path.resolve(__dirname, "../", "dist"),
    "private": path.resolve(__dirname, "../src", 'private'),
    "public": path.resolve(__dirname, "../src", 'public'),
    "defaultHTML": path.resolve(__dirname, "../config", 'default.art'),
}

const publicPath = {
    "pages": path.resolve(location.src, "public", "pages"),
    "scripts": path.resolve(location.src, "public", "scripts"),
    "styles": path.resolve(location.src, "public", "styles"),
    "config": path.resolve(location.src, "public", "config"),
}

const privatePath = {
    "pages": path.resolve(location.src, "private", "html"),
    "scripts": path.resolve(location.src, "private", "scripts"),
    "styles": path.resolve(location.src, "private", "styles"),
    "config": path.resolve(location.src, "private", "config"),
}

const templateDefault = {
    "copyright": "本页版权归天高科技工作室所有。All Rights Reserved",
    "ie8fix": `<script src="../js/ie8fix.js"></script>`
}

module.exports = {
    pageName,
    fileType,
    location,
    publicPath,
    privatePath,
    templateDefault,
}