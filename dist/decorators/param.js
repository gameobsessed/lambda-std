"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBody = exports.Arguments = exports.EventDetailType = exports.Detail = void 0;
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
function EventBody(extractor) {
    return function (object, methodName, parameterIndex) {
        (0, __1.getConfigurationStorage)().addParam({
            type: 'eventBody',
            object,
            methodName,
            parameterIndex,
            resolve(event) {
                return extractor ? extractor(event) : event;
            },
        });
    };
}
exports.EventBody = EventBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXRFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQU0sR0FBUSxLQUFLLENBQUMsTUFBTSxDQUFBO2dCQUU5QixNQUFNLFNBQVMsR0FBRyxlQUFlO29CQUMvQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUMxQyxVQUFVLEVBQUUsS0FBSzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ25CLENBQUM7b0JBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixNQUFNLEdBQUcsR0FBRyxVQUFVO29CQUNwQixDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDakUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBdkNELHdCQXVDQztBQUVELDZEQUE2RDtBQUM3RCxTQUFnQixlQUFlLENBQUMsT0FBd0I7SUFDdEQsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjtRQUV0QixJQUFBLDJCQUF1QixHQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLE9BQU8sQ0FBQyxLQUFpQztnQkFDdkMsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFoQkQsMENBZ0JDO0FBRUQsU0FBZ0IsU0FBUyxDQUN2QixlQUFtQyxTQUFTLEVBQzVDLE9BQXdCO0lBRXhCLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkIsRUFDM0IsY0FBc0I7O1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQ25CLFVBQVUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFOUQsb0JBQW9CLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLEtBQUssRUFBRSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLG1DQUFJLElBQUk7WUFDN0IsVUFBVTtZQUNWLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBZ0M7Z0JBQzVDLElBQUksR0FBRyxHQUFRLFlBQVk7b0JBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBRW5CLE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVQLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVsRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBNUNELDhCQTRDQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUFnQztJQUN4RCxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakMsSUFBSSxFQUFFLFdBQVc7WUFDakIsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsT0FBTyxDQUFDLEtBQVU7Z0JBQ2hCLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtZQUM3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWhCRCw4QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcidcbmltcG9ydCB7IEV2ZW50QnJpZGdlRXZlbnQsIEFwcFN5bmNSZXNvbHZlckV2ZW50IH0gZnJvbSAnYXdzLWxhbWJkYSdcbmltcG9ydCB7IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSURldGFpbE9wdGlvbnMge1xuICBwYXJzZTogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsKG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9IGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdkZXRhaWwnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgdGFyZ2V0VHlwZSxcbiAgICAgIGFzeW5jIHJlc29sdmUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgICAgIGxldCBwYXJzZWQ6IGFueSA9IGV2ZW50LmRldGFpbFxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgID8gdmFsaWRhdG9yQ29uZmlnLnNjaGVtYS52YWxpZGF0ZVN5bmMocGFyc2VkLCB7XG4gICAgICAgICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgICAgICAgICAgICBzdHJpcFVua25vd246IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogcGFyc2VkXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZVxuICAgICAgICAgID8gcGxhaW5Ub0NsYXNzKHRhcmdldFR5cGUsIHZhbGlkYXRlZCwgeyBpZ25vcmVEZWNvcmF0b3JzOiB0cnVlIH0pXG4gICAgICAgICAgOiBwYXJzZWRcblxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50RGV0YWlsVHlwZShvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdkZXRhaWxUeXBlJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHJlc29sdmUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgICAgIHJldHVybiBldmVudFsnZGV0YWlsLXR5cGUnXVxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcmd1bWVudHMoXG4gIGFyZ3VtZW50TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuICBvcHRpb25zPzogSURldGFpbE9wdGlvbnNcbikge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9XG4gICAgICB0YXJnZXRUeXBlICYmIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdhcmd1bWVudCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICBwYXJzZTogb3B0aW9ucz8ucGFyc2UgPz8gdHJ1ZSxcbiAgICAgIHRhcmdldFR5cGUsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnk+KSB7XG4gICAgICAgIGxldCBhcmc6IGFueSA9IGFyZ3VtZW50TmFtZVxuICAgICAgICAgID8gZXZlbnQuYXJndW1lbnRzW2FyZ3VtZW50TmFtZV1cbiAgICAgICAgICA6IGV2ZW50LmFyZ3VtZW50c1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgID8gdmFsaWRhdG9yQ29uZmlnLnNjaGVtYS52YWxpZGF0ZVN5bmMoYXJnLCB7XG4gICAgICAgICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgICAgICAgICAgICBzdHJpcFVua25vd246IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogYXJnXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZSA/IHBsYWluVG9DbGFzcyh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQpIDogYXJnXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudEJvZHkoZXh0cmFjdG9yPzogKHJlY29yZDogYW55KSA9PiBhbnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdldmVudEJvZHknLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcmVzb2x2ZShldmVudDogYW55KSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0b3IgPyBleHRyYWN0b3IoZXZlbnQpIDogZXZlbnRcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19