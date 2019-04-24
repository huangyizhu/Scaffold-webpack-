export default (dom) => {
    const tagName = (dom.tagName || "document").toString().toLowerCase();
    if (tagName === "document") {
        return false;
    }
    let type = "undefined";
    if (tagName === "input" && dom.type) {
        type = dom.type.toString().toLowerCase();
    }
    return tagName === 'input' && (type === "text" || type === "password" || type === "date" || type === "time") || tagName === 'textarea';
}