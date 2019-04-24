var mo = function (e) {
    e.preventDefault();
};

/***禁止滑动***/
function stop() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", mo, false); //禁止页面滑动
}

/***取消滑动限制***/
function move() {
    document.body.style.overflow = ''; //出现滚动条
    document.removeEventListener("touchmove", mo, false);
}

export {
    stop,
    move,
}