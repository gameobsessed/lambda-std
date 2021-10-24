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
function Event(eventType) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        (0, __1.getConfigurationStorage)().addHandler({
            type: 'event',
            object,
            methodName,
            route: eventType || methodName,
        });
    };
}
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTRDO0FBRTVDLFNBQWdCLFVBQVUsQ0FBQyxHQUFHLFVBQW9CO0lBQ2hELE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLEtBQUssTUFBTSxTQUFTLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNuRCxJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNO2dCQUNOLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBaEJELGdDQWdCQztBQUVELFNBQWdCLEtBQUssQ0FBQyxTQUFrQjtJQUN0QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCO0lBQzNCLDZEQUE2RDtJQUM3RCxVQUE4QjtRQUU5QixJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO1lBQ25DLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTTtZQUNOLFVBQVU7WUFDVixLQUFLLEVBQUUsU0FBUyxJQUFJLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWRELHNCQWNDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLFNBQWtCO0lBQ3pDLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTTtZQUNOLFVBQVU7WUFDVixLQUFLLEVBQUUsU0FBUyxJQUFJLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWRELDRCQWNDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFNBQWtCO0lBQ3RDLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLE9BQU87WUFDYixNQUFNO1lBQ04sVUFBVTtZQUNWLEtBQUssRUFBRSxTQUFTLElBQUksVUFBVTtTQUMvQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBZEQsc0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsVHlwZSguLi5maWVsZE5hbWVzOiBzdHJpbmdbXSkge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkge1xuICAgIGZvciAoY29uc3QgZmllbGROYW1lIG9mIFsuLi5maWVsZE5hbWVzLCBtZXRob2ROYW1lXSkge1xuICAgICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRIYW5kbGVyKHtcbiAgICAgICAgdHlwZTogJ2hhbmRsZXInLFxuICAgICAgICBvYmplY3QsXG4gICAgICAgIG1ldGhvZE5hbWUsXG4gICAgICAgIHJvdXRlOiBmaWVsZE5hbWUsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUXVlcnkoZmllbGROYW1lPzogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3JcbiAgKSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRIYW5kbGVyKHtcbiAgICAgIHR5cGU6ICdxdWVyeScsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcm91dGU6IGZpZWxkTmFtZSB8fCBtZXRob2ROYW1lLFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE11dGF0aW9uKGZpZWxkTmFtZT86IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkge1xuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkSGFuZGxlcih7XG4gICAgICB0eXBlOiAnbXV0YXRpb24nLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHJvdXRlOiBmaWVsZE5hbWUgfHwgbWV0aG9kTmFtZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudChldmVudFR5cGU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZEhhbmRsZXIoe1xuICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICByb3V0ZTogZXZlbnRUeXBlIHx8IG1ldGhvZE5hbWUsXG4gICAgfSlcbiAgfVxufVxuIl19