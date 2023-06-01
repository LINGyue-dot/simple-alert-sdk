(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('error-stack-parser'), require('axios')) :
    typeof define === 'function' && define.amd ? define(['error-stack-parser', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SimpleAlertSDK = factory(global.ErrorStackParser, global.axios));
})(this, (function (ErrorStackParser, axios) { 'use strict';

    var AlertStore = {
        // 默认 options
        options: {
            project: "alert",
            version: "1.0.0",
            env: "test",
            baseUrl: "http://localhost:3200",
        },
    };

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

    function send(errorData) {
        var hash = genErrorDataHash(errorData);
        axios
            .post("".concat(AlertStore.options.baseUrl, "/report"), {
            alertData: {
                project: AlertStore.options.project,
                env: AlertStore.options.env,
                version: AlertStore.options.version,
                type: errorData.type,
                data: JSON.stringify(errorData),
                fixed: false,
                hash: hash,
            },
        })
            .catch(function (e) { return console.log(e); });
    }

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

    function listenSyntxError() {
        window.addEventListener("error", function (ev) {
            console.log("".concat(ErrorEnum.ERROR, ":===================== \n"));
            console.log(ev);
            console.log("".concat(ErrorEnum.ERROR, ":===================== \n"));
            // 当在 web worker 中触发，target 为空
            var target = ev.target;
            // JS 语法错误捕获，target 此时为空或者 window
            if (!target || (target && !target.localName)) {
                var stackFrame = ErrorStackParser.parse(target ? ev.error : ev)[0];
                var fileName = stackFrame.fileName, columnNumber = stackFrame.columnNumber, lineNumber = stackFrame.lineNumber;
                var errorData = {
                    type: ErrorEnum.ERROR,
                    time: Date.now(),
                    message: ev.message,
                    fileName: getFileName(fileName),
                    line: lineNumber,
                    column: columnNumber,
                };
                send(errorData);
            }
            // 加载资源错误
            if (target === null || target === void 0 ? void 0 : target.localName) {
                var errorData = {
                    type: ErrorEnum.RESOURCE,
                    time: Date.now(),
                    message: "".concat(target.src, " \u8D44\u6E90\u52A0\u8F7D\u5931\u8D25"),
                    localName: target.localName,
                };
                send(errorData);
            }
        }, 
        // 优先捕获，避免冒泡时候被 React 先处理
        true);
    }
    function listenPromiseError() {
        window.addEventListener("unhandledrejection", function (ev) {
            console.log("".concat(ErrorEnum.PROMISE, ":===================== \n"));
            console.log(ev);
            console.log("".concat(ErrorEnum.PROMISE, ":===================== \n"));
            var stackFrame = ErrorStackParser.parse(ev.reason)[0];
            var fileName = stackFrame.fileName, lineNumber = stackFrame.lineNumber, columnNumber = stackFrame.columnNumber;
            var errorData = {
                type: ErrorEnum.PROMISE,
                time: Date.now(),
                message: ev.reason.message || ev.reason.stack,
                fileName: getFileName(fileName),
                line: lineNumber,
                column: columnNumber,
            };
            send(errorData);
        });
    }
    function initListener() {
        listenSyntxError();
        listenPromiseError();
    }

    var AlertSdk = {
        init: function (options) {
            // dev 下不上报
            if (process.env.NODE_ENV === "development") {
                return;
            }
            AlertStore.options = options;
            initListener();
        },
    };

    return AlertSdk;

}));
