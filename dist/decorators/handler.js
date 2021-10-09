"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Handler = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQTRDO0FBRTVDLFNBQWdCLE9BQU8sQ0FDckIsTUFBYyxFQUNkLFVBQTJCO0FBQzNCLDZEQUE2RDtBQUM3RCxVQUE4QjtJQUU5QixJQUFBLDJCQUF1QixHQUFFLENBQUMsVUFBVSxDQUFDO1FBQ25DLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTTtRQUNOLFVBQVU7S0FDWCxDQUFDLENBQUE7QUFDSixDQUFDO0FBWEQsMEJBV0M7QUFFRCxTQUFnQixLQUFLLENBQUMsU0FBa0I7SUFDdEMsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQjtJQUMzQiw2REFBNkQ7SUFDN0QsVUFBOEI7UUFFOUIsSUFBQSwyQkFBdUIsR0FBRSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU07WUFDTixVQUFVO1lBQ1YsS0FBSyxFQUFFLFNBQVMsSUFBSSxVQUFVO1NBQy9CLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFkRCxzQkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGVyKFxuICBvYmplY3Q6IE9iamVjdCxcbiAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSB7XG4gIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkSGFuZGxlcih7XG4gICAgdHlwZTogJ2hhbmRsZXInLFxuICAgIG9iamVjdCxcbiAgICBtZXRob2ROYW1lLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUXVlcnkoZmllbGROYW1lPzogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3JcbiAgKSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRIYW5kbGVyKHtcbiAgICAgIHR5cGU6ICdxdWVyeScsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcm91dGU6IGZpZWxkTmFtZSB8fCBtZXRob2ROYW1lLFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==