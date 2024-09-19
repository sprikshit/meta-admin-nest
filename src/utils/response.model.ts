export interface IResponse {
    statusCode: number;
    status: string;
    message: string;
    detail?: string | object;
}

export default class ResponseModel {
    static setSuccess(statusCode: number, message: string, detail?: string | object): IResponse {
        return {
            statusCode: statusCode,
            status: "Success",
            message: message,
            detail: typeof detail === "string" ? detail : detail,
        };
    }

    static setError(statusCode: number, message: string, detail?: string): IResponse {
        return {
            statusCode: statusCode,
            status: "Failure",
            message: message,
            detail: detail,
        };
    }
}
