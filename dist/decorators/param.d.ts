export interface IDetailOptions {
    parse: boolean;
}
export declare function Detail(options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
export declare function EventDetailType(options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
export declare function Arguments(argumentName?: string | undefined, options?: IDetailOptions): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
export declare function EventBody(extractor?: (record: any) => any): (object: Object, methodName: string | symbol, parameterIndex: number) => void;
