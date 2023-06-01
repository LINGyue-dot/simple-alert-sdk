var _a;
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum["ERROR"] = "error";
    ErrorEnum["RESOURCE"] = "resource";
    ErrorEnum["PROMISE"] = "promise";
    ErrorEnum["FETCH"] = "fetch";
})(ErrorEnum || (ErrorEnum = {}));
(_a = {},
    _a[ErrorEnum.ERROR] = "JS 语法错误",
    _a[ErrorEnum.RESOURCE] = "静态资源加载错误",
    _a[ErrorEnum.PROMISE] = "Promise 错误",
    _a[ErrorEnum.FETCH] = "网络请求错误",
    _a);

export { ErrorEnum };
