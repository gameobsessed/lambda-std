"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.Mutation = exports.Query = exports.DetailType = void 0;
const __1 = require("..");
function DetailType(...fieldNames) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        for (const fieldName of [...fieldNames, methodName]) {
            (0, __1.getConfigurationStorage)().addHandler({
                type: 'handler',
                object,
                methodName,
                route: fieldName,
            });
        }
    };
}
exports.DetailType = DetailType;
function Query(fieldName) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        (0, __1.getConfigurationStorage)().addHandler({
            type: 'query',
            object,
            methodName,
            route: fieldName || methodName,
        });
    };
}
exports.Query = Query;
function Mutation(fieldName) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        (0, __1.getConfigurationStorage)().addHandler({
            type: 'mutation',
            object,
            methodName,
            route: fieldName || methodName,
        });
    };
}
exports.Mutation = Mutation;
function Event(...eventTypes) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        for (const eventType of [...eventTypes, methodName]) {
            (0, __1.getConfigurationStorage)().addHandler({
                type: 'event',
                object,
                methodName,
                route: eventType,
            });
        }
    };
}
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTRDO0FBRTVDLFNBQWdCLFVBQVUsQ0FBQyxHQUFHLFVBQW9CO0lBQ2hELE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLEtBQUssTUFBTSxTQUFTLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNuRCxJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNO2dCQUNOLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBaEJELGdDQWdCQztBQUVELFNBQWdCLEtBQUssQ0FBQyxTQUFrQjtJQUN0QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCO0lBQzNCLDZEQUE2RDtJQUM3RCxVQUE4QjtRQUU5QixJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO1lBQ25DLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTTtZQUNOLFVBQVU7WUFDVixLQUFLLEVBQUUsU0FBUyxJQUFJLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWRELHNCQWNDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLFNBQWtCO0lBQ3pDLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTTtZQUNOLFVBQVU7WUFDVixLQUFLLEVBQUUsU0FBUyxJQUFJLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWRELDRCQWNDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLEdBQUcsVUFBb0I7SUFDM0MsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQjtJQUMzQiw2REFBNkQ7SUFDN0QsVUFBOEI7UUFFOUIsS0FBSyxNQUFNLFNBQVMsSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ25ELElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ25DLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU07Z0JBQ04sVUFBVTtnQkFDVixLQUFLLEVBQUUsU0FBUzthQUNqQixDQUFDLENBQUE7U0FDSDtJQUNILENBQUMsQ0FBQTtBQUNILENBQUM7QUFoQkQsc0JBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGZ1bmN0aW9uIERldGFpbFR5cGUoLi4uZmllbGROYW1lczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBmb3IgKGNvbnN0IGZpZWxkTmFtZSBvZiBbLi4uZmllbGROYW1lcywgbWV0aG9kTmFtZV0pIHtcbiAgICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkSGFuZGxlcih7XG4gICAgICAgIHR5cGU6ICdoYW5kbGVyJyxcbiAgICAgICAgb2JqZWN0LFxuICAgICAgICBtZXRob2ROYW1lLFxuICAgICAgICByb3V0ZTogZmllbGROYW1lLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFF1ZXJ5KGZpZWxkTmFtZT86IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkge1xuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkSGFuZGxlcih7XG4gICAgICB0eXBlOiAncXVlcnknLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHJvdXRlOiBmaWVsZE5hbWUgfHwgbWV0aG9kTmFtZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNdXRhdGlvbihmaWVsZE5hbWU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZEhhbmRsZXIoe1xuICAgICAgdHlwZTogJ211dGF0aW9uJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICByb3V0ZTogZmllbGROYW1lIHx8IG1ldGhvZE5hbWUsXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnQoLi4uZXZlbnRUeXBlczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBvZiBbLi4uZXZlbnRUeXBlcywgbWV0aG9kTmFtZV0pIHtcbiAgICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkSGFuZGxlcih7XG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIG9iamVjdCxcbiAgICAgICAgbWV0aG9kTmFtZSxcbiAgICAgICAgcm91dGU6IGV2ZW50VHlwZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=