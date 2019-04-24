function is(obj, type) {
    return typeof obj === type;
}
// 事件兼容
var isEventSupported = (function () {

    var TAGNAMES = {
        'select': 'input',
        'change': 'input',
        'submit': 'form',
        'reset': 'form',
        'error': 'img',
        'load': 'img',
        'abort': 'img'
    };

    function isEventSupported(eventName, element) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        var isSupported = eventName in element;

        if (!isSupported) {
            if (!element.setAttribute) {
                element = document.createElement('div');
            }
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, '');
                isSupported = is(element[eventName], 'function');

                if (!is(element[eventName], 'undefined')) {
                    element[eventName] = undefined;
                }
                element.removeAttribute(eventName);
            }
        }

        element = null;
        return isSupported;
    }
    return isEventSupported;
})();

export default isEventSupported;