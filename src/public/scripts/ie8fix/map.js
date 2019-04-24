if (!window.Map) {
    class Map {
        constructor() {
            this.nameArray = new Array();
            this.valueArray = new Array();
        };
        set(key, value) {
            if (typeof (key) !== 'string') {
                console.error(key + " is not a string");
            }
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                if (this.nameArray[index] === key) {
                    this.valueArray[index] = value;
                    return true;
                }
            }
            this.nameArray.push(key);
            this.valueArray.push(value);
            return true;
        };
        get(key) {
            if (typeof (key) !== 'string') {
                console.error(key + " is not a string");
            }
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                if (this.nameArray[index] === key) {
                    return this.valueArray[index];
                }
            }
            return undefined;
        };

        size() {
            return this.nameArray.length();
        };

        has(key) {
            if (typeof (key) !== 'string') {
                console.error(key + " is not a string");
            }
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                if (this.nameArray[index] === key) {
                    return true;
                }
            }
            return false;
        };

        delete(key) {
            if (typeof (key) !== 'string') {
                console.error(key + " is not a string");
            }
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                if (this.nameArray[index] === key) {
                    this.nameArray.splice(index, 1);
                    return true;
                }
            }
            return false;
        }

        toString() {
            let result = `{`;
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                result += `"${this.nameArray[index]}":${this.valueArray[index]},`;
            }
            result.substring(0, result.length() - 1);
            result += `}`;
            return JSON.parse(result);
        };

        keys() {
            return this.nameArray;
        }

        values() {
            return this.valueArray;
        }

        forEach(func) {
            if (typeof (func) !== "function") {
                console.error(func + " is not a function");
            }
            for (let index = 0, length = this.nameArray.length; index < length; index++) {
                func(this.valueArray[index], this.nameArray[index]);
            }
        }
    }

    window.Map = Map;

    class WeakMap extends Map {

    }

    window.WeakMap = WeakMap;
}