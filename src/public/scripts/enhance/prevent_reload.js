function disableReload() {
    document.onkeydown = function () {
        if (event.keyCode == 116) {
            event.keyCode = 0;
            event.returnValue = false;
        }
    }
}

function enableReload() {
    document.onkeydown = function () {
        if (event.keyCode == 116) {
            event.keyCode = 0;
            event.returnValue = false;
        }
    }
}

export default {
    "disableReload": disableReload,
    "enableReload": enableReload
};