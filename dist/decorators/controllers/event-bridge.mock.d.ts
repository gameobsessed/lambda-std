/// <reference types="jest" />
export declare const mockedErrorHandler: jest.Mock<any, any>;
declare class ErrorService {
    constructor();
    handle(model: any): Promise<void>;
}
declare class ErrorModel {
    constructor();
}
export declare class ErrorController {
    errorService: ErrorService;
    init(): Promise<void>;
    handler(model: ErrorModel): Promise<void>;
}
export {};
