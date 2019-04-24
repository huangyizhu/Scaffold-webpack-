import error from "error";
import Dom from 'dom';
import POJO from 'pojo';
import ajax from 'ajax';
import selector from 'selector';

const api = {
    "File": window.File,
    "FormData": window.FormData,
}

function getDoc(frame) {
    /**
     * 解决IE8同源策略
     */
    let doc = null;

    // IE8 cascading access check
    try {
        if (frame.contentWindow) {
            doc = frame.contentWindow.document;
        }
    } catch (err) {
        // IE8 access denied under ssl & missing protocol
        error('cannot get iframe.contentWindow document: ' + err);
    }

    if (doc) { // successful getting content
        return doc;
    }

    try { // simply checking may throw in ie8 under ssl or mismatched protocol
        doc = frame.contentDocument ? frame.contentDocument : frame.document;
    } catch (err) {
        // last attempt
        error('cannot get iframe.contentDocument: ' + err);
        doc = frame.document;
    }

    return doc;
}

const checkParam = (url, type, param, fileDom) => {
    //输入格式检测
    if (typeof (url) !== 'string') {
        error(url + " is not a string");
    }
    if (typeof (type) !== 'string') {
        error(type + " is not a string");
    }
    if (!param instanceof POJO) {
        error(param + " is not a POJO");
    }
    if (!fileDom instanceof Dom && fileDom.tagName === "input" && fileDom.getAttr("type") === "file") {
        error(fileDom + " is not a file Dom");
    }
}

const createIframe = (body, form) => {
    const iframe = new Dom("iframe");
    const target = "fileupload";
    iframe.setAttr('width', '0');
    iframe.setAttr('height', '0');
    iframe.setAttr('frameborder', '0');
    iframe.setAttr("name", target);
    form.setAttr("target", target);
    body.addChildTail(iframe);
    const iframeDoc = getDoc(iframe.getDom());
    iframeDoc.open();
    iframeDoc.write("<html><body></body></html>");
    iframeDoc.body.appendChild(form.getDom());
    iframeDoc.close();
    //设置iframe的src防止ie8下的进度条
    iframe.setAttr("src", /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank');
    return iframe;
}

const createForm = (param, fileDom, multipart, type, url) => {
    const form = new Dom("form");
    form.setAttr("action", url);
    form.setAttr("method", type);
    form.setAttr("enconding", "multipart/form-data");
    form.setAttr("enctype", "multipart/form-data");
    param.forEach((value, key) => {
        const inputDom = new Dom("input");
        inputDom.setAttr("name", key);
        inputDom.setAttr("value", value);
        form.addChildTail(inputDom);
    });
    if (multipart) {
        fileDom.forEach((dom) => {
            const newFileDom = dom.clone(true);
            newFileDom.setValue(dom.getValue());
            dom.replaceNode(newFileDom);
            form.addChildTail(dom);
        });
    } else {
        const newFileDom = fileDom.clone(true);
        newFileDom.setValue(fileDom.getValue());
        fileDom.replaceNode(newFileDom);
        form.addChildTail(fileDom);
    }
    return form;
}

const getResponse = (iframe) => {
    const doc = getDoc(iframe.getDom());
    const pre = doc.getElementsByTagName('pre')[0];
    const h1 = doc.getElementsByTagName('h1')[0];
    const status = h1 ? h1.textContent ? h1.textContent : h1.innerText : undefined;
    const body = doc.body;
    let responseText;
    if (status && status.indexOf("200") < 0) {
        responseText = body.textContent ? body.textContent : body.innerText;
    } else if (pre) {
        responseText = pre.textContent ? pre.textContent : pre.innerText;
    } else {
        responseText = "";
    }
    try {
        return JSON.parse(responseText);
    } catch (e) {
        return responseText;
    }
}

const ajaxFileUpload = ({
    url,
    type = "GET",
    param,
    fileDom,
    multipart = false,
    async = true,
    acceptFunc = (data) => {
        if (data) {
            console.log(data);
        }
    },
    failFunc = (err) => {
        if (err) {
            if (err.get && err.get("message")) {
                alert(err.get("message"));
            } else {
                alert(err);
            }
        } else {
            error("请检查网络连接，或尝试刷新页面");
        }
    }
}) => {
    checkParam(url, type, param, fileDom);
    if (multipart && !fileDom instanceof Array) {
        const arr = [];
        arr.push(fileDom);
        fileDom = arr;
    }
    //使用FormData上传
    if (api.File && api.FormData) {
        const formdata = param.getFormData();
        if (multipart) {
            fileDom.forEach((dom) => {
                const filesArray = dom.files;
                filesArray.forEach((file) => {
                    fd.append(dom.getAttr("name"), file);
                })
            })
        } else {
            formdata.append(fileDom.getAttr("name"), fileDom.getAttr("files")[0]);
        }
        ajax({
            "url": url,
            "type": type,
            "param": formdata,
            "async": async,
            "acceptFunc": acceptFunc,
            "failFunc": failFunc,
            "contentType": "file",
        })
    } else {
        //创建表单并用iframe实现提交不刷新
        const body = selector.getElement("body");
        const form = createForm(param, fileDom, multipart, type, url);
        const iframe = createIframe(body, form);
        iframe.addListener("load", () => {
            //通过iframe刷新获取数据，取出数据执行操作并删除iframe
            const resp = getResponse(iframe);
            if (typeof (resp) === 'string') {
                failFunc(resp);
            } else {
                acceptFunc(resp);
            }
            setTimeout(() => {
                body.removeChild(iframe);
            }, 10);
        })
        if (async) {
            form.getDom().submit();
        } else {
            setTimeout(form.getDom().submit, 5);
        }
    }
}
export default ajaxFileUpload;