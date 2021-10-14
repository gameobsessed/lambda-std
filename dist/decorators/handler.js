"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.DetailType = void 0;
const __1 = require("..");
function DetailType(fieldName) {
    return function (object, methodName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor) {
        (0, __1.getConfigurationStorage)().addHandler({
            type: 'handler',
            object,
            methodName,
            route: fieldName || methodName,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTRDO0FBRTVDLFNBQWdCLFVBQVUsQ0FBQyxTQUFrQjtJQUMzQyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCO0lBQzNCLDZEQUE2RDtJQUM3RCxVQUE4QjtRQUU5QixJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO1lBQ25DLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTTtZQUNOLFVBQVU7WUFDVixLQUFLLEVBQUUsU0FBUyxJQUFJLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWRELGdDQWNDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFNBQWtCO0lBQ3RDLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQThCO1FBRTlCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLE9BQU87WUFDYixNQUFNO1lBQ04sVUFBVTtZQUNWLEtBQUssRUFBRSxTQUFTLElBQUksVUFBVTtTQUMvQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBZEQsc0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsVHlwZShmaWVsZE5hbWU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZEhhbmRsZXIoe1xuICAgICAgdHlwZTogJ2hhbmRsZXInLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHJvdXRlOiBmaWVsZE5hbWUgfHwgbWV0aG9kTmFtZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBRdWVyeShmaWVsZE5hbWU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZEhhbmRsZXIoe1xuICAgICAgdHlwZTogJ3F1ZXJ5JyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICByb3V0ZTogZmllbGROYW1lIHx8IG1ldGhvZE5hbWUsXG4gICAgfSlcbiAgfVxufVxuIl19