import Dom from 'dom';
import $ from 'selector';
(function () {
    const errorDialog = new Dom('div');
    window.onerror = (message, url, line) => {
        const p = new Dom('p');
        p.setValue("页面出现异常，请刷新重试或更换尝试更换浏览器");
        errorDialog.addChildTail(p);
        errorDialog.show();
    }
    errorDialog.addClassName("pf l0 t0 w100 tc z999 error");
    errorDialog.hide();
    $.getElement("body")[0].addChildFront(errorDialog);
})()