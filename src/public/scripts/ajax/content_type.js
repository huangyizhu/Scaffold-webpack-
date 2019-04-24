export default (type) => {
    let contentType = '';
    if (type) {
        switch (type) {
            case "form":
            default:
                contentType = "application/x-www-form-urlencoded;";
                break;
            case "file":
                break;
            case "json":
                contentType = "application/json";
                break;
            case "xml":
                contentType = "text/xml";
                break;
        }
    }
    return contentType;
}