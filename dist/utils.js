/**
 *
 * @param fileName
 * @returns
 */
function getFileName(fileName) {
    var paths = fileName.split("/");
    return paths[paths.length - 1];
}
function genErrorDataHash(errorData) {
    if ("fileName" in errorData) {
        return "".concat(errorData.type, "-").concat(errorData.message, "-").concat(errorData.fileName, "-").concat(errorData.line, "-").concat(errorData.column);
    }
    else {
        return "".concat(errorData.type, "-").concat(errorData.message);
    }
}
// 1. coldsail 如何 build 的，注入了哪些 env

export { genErrorDataHash, getFileName };
