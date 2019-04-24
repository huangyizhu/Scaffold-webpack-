(function() {
    if (!Array.indexOf) {
        Array.prototype.indexOf = (pattern) => {
            let array = this;
            for (let index = 0, length = array.length; index < length; index++) {
                if (array[index] === pattern) {
                    return index;
                }
            }
            return -1;
        }
    }
})();