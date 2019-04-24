//此函数用于合并对象，当同名是数组将会自动合并,同名对象进行递归，将内部也合并，同名的属性时才会发生覆盖
//支持多对象同时输入

const assign = (...objs) => {
    let assignObj = {};
    objs.forEach((obj) => {
        Object.keys(obj).forEach((objValue) => {
            if (assignObj[objValue]) {
                if (assignObj[objValue] instanceof Array) {
                    obj[objValue].forEach((arrayValue) => {
                        assignObj[objValue].push(arrayValue);
                    });
                } else if (typeof(assignObj[objValue]) === 'object') {
                    assignObj[objValue] = assign(assignObj[objValue], obj[objValue]);
                } else {
                    assignObj[objValue] = obj[objValue];
                }
            } else {
                assignObj[objValue] = obj[objValue];
            }
        });
    });
    return assignObj;
}

module.exports = assign;