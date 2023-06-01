import ErrorStackParser from 'error-stack-parser';
import { send } from './transport.js';
import { ErrorEnum } from './types.js';
import { getFileName } from './utils.js';

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

export { initListener as default, listenPromiseError, listenSyntxError };
