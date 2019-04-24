const isDom = (obj) => {
    return (typeof HTMLElement === 'object') ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

export default isDom;