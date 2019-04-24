import error from 'error';

class DataBase {
    constructor() {
        // this.map = new Map();
        this.judgement = window.sessionStorage && (function () {
            try {
                sessionStorage.getItem("test");
                return true;
            } catch (quotaExceededError) {
                console.error("cant support Storage");
                return false;
            }
        })();
        this.sessionStorage = window.sessionStorage;
    }
    save(key, value) {
        if (this.judgement) {
            if (typeof (key) !== 'string') {
                error(key + "is not a string");
            }
            value = JSON.stringify(value);
            this.sessionStorage.setItem(key, value);
        }
    }
    find(key) {
        if (this.judgement) {
            if (typeof (key) !== 'string') {
                error(key + "is not a string");
            }
            return JSON.parse(this.sessionStorage.getItem(key));
        }
    }
    delete(key) {
        if (this.judgement) {
            if (typeof (key) !== 'string') {
                error(key + "is not a string");
            }
            return this.sessionStorage.removeItem(key);
        }
    }
}

export default new DataBase();