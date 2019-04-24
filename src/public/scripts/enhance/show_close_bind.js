import selector from "selector";
import error from "error";

//使用闭包＋setTimeout异步加载提高加载速度
setTimeout(() => {
    const arr = [];
    const closeArray = selector.getElement("[close]");
    const showArray = selector.getElement("[show]");
    if(closeArray && closeArray.length > 0) {
        arr.push(...closeArray);
    }
    if(showArray && showArray.length > 0) {
        arr.push(...showArray);
    }
    if (arr && arr.length > 0) {
        arr.forEach((button) => {
            (function (button) {
                setTimeout(() => {
                    if(button.getAttr("close") && button.getAttr("show")) {
                        error(button + "couldn't have two target");
                    }
                    const isClose = button.getAttr("close");
                    let target;
                    if(isClose) {
                        target = selector.getElement(button.getAttr("close"));
                    } else {
                        target = selector.getElement(button.getAttr("show"));
                    }
                    button.addListener("click", () => {
                        if(isClose) {
                            target.hide();
                        } else {
                            target.show();
                        }
                    }, true);
                });
            })(button);
        })
    }
});