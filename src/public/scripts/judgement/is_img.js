export default (dom) => {
    const tagName = (dom.tagName || "document").toString().toLowerCase();
    return tagName === 'img';
}