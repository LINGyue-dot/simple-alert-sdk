export interface AlertOptionsProps {
    project: string;
    version?: string;
    env?: "development" | "production" | "test";
    baseUrl: string;
}
export declare enum ErrorEnum {
    ERROR = "error",
    RESOURCE = "resource",
    PROMISE = "promise",
    FETCH = "fetch"
}
export declare const ErrorTextMap: {
    error: string;
    resource: string;
    promise: string;
    fetch: string;
};
export interface SyntxErrorProps {
    type: ErrorEnum;
    time: number;
    message: string;
    fileName: string;
    line: number;
    column: number;
}
export type PromiseErrorProps = SyntxErrorProps;
export interface ResourceErrorProps {
    type: ErrorEnum;
    time: number;
    message: string;
    localName: string;
}
export interface TransportDataProp {
    project: string;
    version: string;
    hash: string;
    env: "production" | "test";
    errorData: ErrorDataType;
    deviceInfo: string;
    userInfo: string;
}
export type ErrorDataType = SyntxErrorProps | ResourceErrorProps;
export interface ReportDataProps {
    project: string;
    env: string;
    version: string;
    type: ErrorEnum;
    data: string;
    fixed: boolean;
    hash: string;
}
export interface AlertDataProps extends ReportDataProps {
    id: string;
}
