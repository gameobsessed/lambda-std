export declare function DetailType(...fieldNames: string[]): (object: Object, methodName: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Query(fieldName?: string): (object: Object, methodName: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Mutation(fieldName?: string): (object: Object, methodName: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Event(...eventTypes: string[]): (object: Object, methodName: string | symbol, descriptor: PropertyDescriptor) => void;
