const path = global.path || require("path");

const resolve = {
  alias: {
    "ie8fix": path.resolve(__dirname, "../src/public/scripts/ie8fix"),
    "public": path.resolve(__dirname, "../src/public"),
    "judgement": path.resolve(__dirname, "../src/public/scripts/judgement"),
    "error": path.resolve(__dirname, '../src/public/scripts/enhance/error.js'),
    "dom": path.resolve(__dirname, '../src/public/scripts/dom/dom.js'),
    "selector": path.resolve(__dirname, '../src/public/scripts/dom/selector.js'),
    "database": path.resolve(__dirname, '../src/public/scripts/enhance/database.js'),
    "error-dialog": path.resolve(__dirname, '../src/public/scripts/enhance/error_dialog.js'),
    "pojo": path.resolve(__dirname, '../src/public/scripts/ajax/pojo.js'),
    "ajax": path.resolve(__dirname, '../src/public/scripts/ajax/ajax.js'),
    "enhance": path.resolve(__dirname, '../src/public/scripts/enhance'),
  },
};

module.exports = resolve;