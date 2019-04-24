import error from 'error';
import getContentType from './content_type';
import POJO from 'pojo';

const ajax = ({
    url,
    param,
    type = "GET",
    contentType = "form", original = false,
    async = true,
    cache = true,
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
    if (!url) {
        error("url is null");
        return;
    }
    if (param && param instanceof POJO) {
        param.changeType(contentType);
    }
    contentType = getContentType(contentType);
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
    type = type.toUpperCase();
    xhr.open(type, encodeURI(url), async);
    if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }
    if(!cache) {
        xhr.setRequestHeader('If-Modified-Since', '0');
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(original) {
                    acceptFunc(xhr.responseText);
                    return;
                }
                const responseText = decodeURI(xhr.responseText);
                if(responseText.indexOf("{") == -1) {
                    acceptFunc(responseText);
                } else {
                    let pojo = null;
                    try {
                        pojo = new POJO(responseText);
                    } catch (JSONPraseError) {
                        acceptFunc(responseText);
                        return;
                    }
                    if (pojo.get("status") === "accept") {
                        acceptFunc(pojo);
                    } else {
                        failFunc(pojo);
                    }
                }
            } else {
                failFunc();
            }
        }
    }
    if(xhr.onerror) {
        xhr.onerror = () => {
            failFunc();
        }
    }
    if(param) {
        if(param instanceof POJO) {
            xhr.send(param.toString());
        } else {
            xhr.send(param);
        }
    } else {
        xhr.send();
    }
};

export default ajax;