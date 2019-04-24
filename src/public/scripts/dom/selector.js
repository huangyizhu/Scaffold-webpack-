import Dom from 'dom';
import error from 'error';
import isDom from 'judgement/is_dom';
import Sizzle from "sizzle";

// 保存dom节点
class Spring {
    constructor() {
        this.container = new Map();
    };
    selectElement(elementInfo) {
        const matchElement = Sizzle(elementInfo);
        if (!matchElement || matchElement.length == 0) {
            return false;
            // error(matchElement + " has not matched element"); 本页面没有show标签暂时忽略没有匹配情况
        }
        let element
        //只有使用id方式才会返回单个元素,其他时候皆返回数组
        if (elementInfo.charAt(0) == '#') {
            if(matchElement.length > 1) {
                error(elementInfo + " has more than one matched element,only return first matched element");
            }
            element = new Dom(matchElement[0]);
        } else {
            element = [];
            for (let index = 0, len = matchElement.length; index < len; index++) {
                element.push(new Dom(matchElement[index]));
            }
        }
        this.container.set(elementInfo, element);
        return element;
    }
    getElement(elementInfo) {
        if (!elementInfo || typeof (elementInfo) !== 'string') {
            error(elementInfo + " is not a selector");
        }
        if (this.container.has(elementInfo)) {
            //保证单实例,使用try,catch防止ie8中出现空的dom元素而出现的没有权限异常
            //只有容器中存在该条信息，且该信息没有被垃圾回收或没被销毁时才返回，其他时候皆重新获取dom
            const elements = this.container.get(elementInfo);
            try {
                if (elements instanceof Array) {
                    let isDomArr = true;
                    elements.forEach((element) => {
                        if (!isDom(element.getDom())) {
                            isDomArr = false;
                            return;
                        }
                    })
                    return isDomArr ? elements : this.selectElement(elementInfo);
                } else if (isDom(elements.getDom())) {
                    return elements;
                } else {
                    return this.selectElement(elementInfo);
                }
            } catch (nullElementException) {
                return this.selectElement(elementInfo);
            }
        } else {
            return this.selectElement(elementInfo);
        }
    };
}

export default new Spring()