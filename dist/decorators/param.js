"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = exports.EventDetailType = exports.Detail = void 0;
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
function Detail(options) {
    return function (object, methodName, parameterIndex) {
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types === null || types === void 0 ? void 0 : types[parameterIndex];
        const configurationStorage = (0, __1.getConfigurationStorage)();
        const validatorConfig = configurationStorage.findValidator(targetType);
        configurationStorage.addParam({
            type: 'detail',
            object,
            methodName,
            parameterIndex,
            targetType,
            async resolve(event) {
                let parsed = event.detail;
                const validated = validatorConfig
                    ? validatorConfig.schema.validateSync(parsed, {
                        abortEarly: false,
                        stripUnknown: true,
                    })
                    : parsed;
                const obj = targetType
                    ? (0, class_transformer_1.plainToClass)(targetType, validated, { ignoreDecorators: true })
                    : parsed;
                return obj;
            },
        });
    };
}
exports.Detail = Detail;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EventDetailType(options) {
    return function (object, methodName, parameterIndex) {
        (0, __1.getConfigurationStorage)().addParam({
            type: 'detailType',
            object,
            methodName,
            parameterIndex,
            resolve(event) {
                return event['detail-type'];
            },
        });
    };
}
exports.EventDetailType = EventDetailType;
function Arguments(argumentName = undefined, options) {
    return function (object, methodName, parameterIndex) {
        var _a;
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types === null || types === void 0 ? void 0 : types[parameterIndex];
        const configurationStorage = (0, __1.getConfigurationStorage)();
        const validatorConfig = targetType && configurationStorage.findValidator(targetType);
        configurationStorage.addParam({
            type: 'argument',
            object,
            methodName,
            parameterIndex,
            parse: (_a = options === null || options === void 0 ? void 0 : options.parse) !== null && _a !== void 0 ? _a : true,
            targetType,
            async resolve(event) {
                let arg = argumentName
                    ? event.arguments[argumentName]
                    : event.arguments;
                const validated = validatorConfig
                    ? validatorConfig.schema.validateSync(arg, {
                        abortEarly: false,
                        stripUnknown: true,
                    })
                    : arg;
                const obj = targetType ? (0, class_transformer_1.plainToClass)(targetType, validated) : arg;
                return obj;
            },
        });
    };
}
exports.Arguments = Arguments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXRFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQU0sR0FBUSxLQUFLLENBQUMsTUFBTSxDQUFBO2dCQUU5QixNQUFNLFNBQVMsR0FBRyxlQUFlO29CQUMvQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUMxQyxVQUFVLEVBQUUsS0FBSzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ25CLENBQUM7b0JBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixNQUFNLEdBQUcsR0FBRyxVQUFVO29CQUNwQixDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDakUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBdkNELHdCQXVDQztBQUVELDZEQUE2RDtBQUM3RCxTQUFnQixlQUFlLENBQUMsT0FBd0I7SUFDdEQsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjtRQUV0QixJQUFBLDJCQUF1QixHQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLE9BQU8sQ0FBQyxLQUFpQztnQkFDdkMsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFoQkQsMENBZ0JDO0FBRUQsU0FBZ0IsU0FBUyxDQUN2QixlQUFtQyxTQUFTLEVBQzVDLE9BQXdCO0lBRXhCLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkIsRUFDM0IsY0FBc0I7O1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQ25CLFVBQVUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFOUQsb0JBQW9CLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLEtBQUssRUFBRSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLG1DQUFJLElBQUk7WUFDN0IsVUFBVTtZQUNWLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBZ0M7Z0JBQzVDLElBQUksR0FBRyxHQUFRLFlBQVk7b0JBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBRW5CLE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVQLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVsRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBNUNELDhCQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgRXZlbnRCcmlkZ2VFdmVudCwgQXBwU3luY1Jlc29sdmVyRXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGludGVyZmFjZSBJRGV0YWlsT3B0aW9ucyB7XG4gIHBhcnNlOiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZXRhaWwob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzPy5bcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID0gY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2RldGFpbCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogRXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4pIHtcbiAgICAgICAgbGV0IHBhcnNlZDogYW55ID0gZXZlbnQuZGV0YWlsXG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGVkID0gdmFsaWRhdG9yQ29uZmlnXG4gICAgICAgICAgPyB2YWxpZGF0b3JDb25maWcuc2NoZW1hLnZhbGlkYXRlU3luYyhwYXJzZWQsIHtcbiAgICAgICAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXG4gICAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBwYXJzZWRcblxuICAgICAgICBjb25zdCBvYmogPSB0YXJnZXRUeXBlXG4gICAgICAgICAgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkLCB7IGlnbm9yZURlY29yYXRvcnM6IHRydWUgfSlcbiAgICAgICAgICA6IHBhcnNlZFxuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5leHBvcnQgZnVuY3Rpb24gRXZlbnREZXRhaWxUeXBlKG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2RldGFpbFR5cGUnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcmVzb2x2ZShldmVudDogRXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4pIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50WydkZXRhaWwtdHlwZSddXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFyZ3VtZW50cyhcbiAgYXJndW1lbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9uc1xuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzPy5bcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID1cbiAgICAgIHRhcmdldFR5cGUgJiYgY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2FyZ3VtZW50JyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHBhcnNlOiBvcHRpb25zPy5wYXJzZSA/PyB0cnVlLFxuICAgICAgdGFyZ2V0VHlwZSxcbiAgICAgIGFzeW5jIHJlc29sdmUoZXZlbnQ6IEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueT4pIHtcbiAgICAgICAgbGV0IGFyZzogYW55ID0gYXJndW1lbnROYW1lXG4gICAgICAgICAgPyBldmVudC5hcmd1bWVudHNbYXJndW1lbnROYW1lXVxuICAgICAgICAgIDogZXZlbnQuYXJndW1lbnRzXG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGVkID0gdmFsaWRhdG9yQ29uZmlnXG4gICAgICAgICAgPyB2YWxpZGF0b3JDb25maWcuc2NoZW1hLnZhbGlkYXRlU3luYyhhcmcsIHtcbiAgICAgICAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXG4gICAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBhcmdcblxuICAgICAgICBjb25zdCBvYmogPSB0YXJnZXRUeXBlID8gcGxhaW5Ub0NsYXNzKHRhcmdldFR5cGUsIHZhbGlkYXRlZCkgOiBhcmdcblxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==