const consoleError = (errorHint) => {
    console.error(errorHint);
    throw new Error(errorHint);
}
const alertError = (errorHint) => {
    alert(errorHint);
    throw new Error(errorHint);
}

export default consoleError;