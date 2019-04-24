if (!Object.create) {
    Object.create = function (o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function') console.error('Object prototype may only be an Object: ' + o);
        else if (o === null) console.error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");

        for (let property in properties) {
            Object.defineProperties(F, property);
        }

        function F() {}

        F.prototype = o;

        return new F();
    };
}