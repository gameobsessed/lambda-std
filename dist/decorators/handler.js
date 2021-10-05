"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const __1 = require("..");
function Handler(object, methodName, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
descriptor) {
    (0, __1.getConfigurationStorage)().addHandler({
        type: 'handler',
        object,
        methodName,
    });
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTRDO0FBRTVDLFNBQWdCLE9BQU8sQ0FDckIsTUFBYyxFQUNkLFVBQTJCO0FBQzNCLDZEQUE2RDtBQUM3RCxVQUE4QjtJQUU5QixJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO1FBQ25DLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTTtRQUNOLFVBQVU7S0FDWCxDQUFDLENBQUE7QUFDSixDQUFDO0FBWEQsMEJBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlcihcbiAgb2JqZWN0OiBPYmplY3QsXG4gIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3Jcbikge1xuICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZEhhbmRsZXIoe1xuICAgIHR5cGU6ICdoYW5kbGVyJyxcbiAgICBvYmplY3QsXG4gICAgbWV0aG9kTmFtZSxcbiAgfSlcbn1cbiJdfQ==