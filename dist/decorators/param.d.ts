export interface IDetailOptions {
    parse: boolean;
}
export declare function Detail(options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
export declare function DetailType(options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
export declare function Argument(argumentName: string, options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
