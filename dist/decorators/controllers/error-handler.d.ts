export interface IErrorHandler<R> {
    (error: Error | unknown): R;
}
export declare function defaultErrorHandler(error: Error | unknown): void;
