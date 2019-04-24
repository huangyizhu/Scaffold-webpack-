import Dom from 'dom';
import error from 'error';

class POJO {
    constructor(form) {
        this.data = new Map();
        this.type = "form";
        if (form) {
            if (typeof (form) === 'string' && JSON.parse(form)) {
                this.strToMap(form);
                return;
            }
            if (!form instanceof Dom) {
                error(form + " is not the instance of Dom");
            } else if (form.tagName.toString().toLowerCase() !== 'form') {
                error(form + " is not a form");
            }
            form.getChildren().forEach((input) => {
                if (input.getAttr("tagName") === "input" && input.getAttr("type") === "text" || input.getAttr("type") === "password") {
                    const key = input.getAttr("name");
                    const value = input.getValue();
                    if (key && value && key !== '') {
                        this.data.set(key, value);
                    }
                }
            });
        }
    }

    changeType(type) {
        this.type = type;
    }

    setType(type) {
        this.type = type;
    }
    
    getType(type) {
        return this.type;
    }
    get(key) {
        if (typeof (key) !== 'string') {
            error(key + " is a string");
        }
        return this.data.get(key);
    }
    append(key, value) {
        if (typeof (key) !== 'string') {
            error(key + " is not a string");
        }
        if(null != value && 'string' === typeof(value)) {
            value = value.toString().trim();
        }
        this.data.set(key.trim(), value);
    }
    forEach(func) {
        return this.data.forEach(func);
    }
    toString() {
        if (this.type === 'form') {
            let result = '';
            this.data.forEach((value, key) => {
                result += `${key}=${encodeURIComponent(value)}&`;
            });
            return result.substring(0, result.length - 1);
        } else if (this.type = 'json') {
            let result = {};
            this.data.forEach((value, key) => {
                result[key] = value;
            });
            return JSON.stringify(result);
        }

    }
    getFormData() {
        if (!window.FormData) {
            return null;
        }
        const fd = new FormData();
        this.data.forEach((value, key) => {
            fd.append(key, value);
        });
        return fd;
    }
    strToMap(json) {
        const jsonObj = JSON.parse(json);
        for (let key in jsonObj) {
            if('string' === typeof (jsonObj[key])) {
                const jsonStr = jsonObj[key].toString().trim();
                if(jsonStr.charAt(0) == '[') {
                    this.append(key, jsonStr.slice(1, -1).split(','));
                } else if(jsonStr.charAt(0) == '{'){
                    this.append(key, JSON.parse(jsonStr));
                } else {
                    this.append(key, jsonStr);
                }
            } else {
                this.append(key, jsonObj[key]);
            }
        }
    }
}

export default POJO;