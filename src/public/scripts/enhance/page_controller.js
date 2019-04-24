function reload() {
    location.reload();
}

function jump(url) {
    location.href = url;
}

export default {
    "reload": reload,
    "jump": jump
}