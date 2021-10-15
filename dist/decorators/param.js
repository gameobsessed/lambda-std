"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = exports.EventDetailType = exports.Detail = void 0;
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
function Detail(options) {
    return function (object, methodName, parameterIndex) {
        var _a;
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types === null || types === void 0 ? void 0 : types[parameterIndex];
        const configurationStorage = (0, __1.getConfigurationStorage)();
        const validatorConfig = configurationStorage.findValidator(targetType);
        configurationStorage.addParam({
            type: 'detail',
            object,
            methodName,
            parameterIndex,
            parse: (_a = options === null || options === void 0 ? void 0 : options.parse) !== null && _a !== void 0 ? _a : true,
            targetType,
            async resolve(event) {
                let parsed;
                try {
                    parsed = JSON.parse(event.detail);
                }
                catch (e) {
                    // TODO: replace with custom errors
                    throw new Error('Body parsing error');
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCOztRQUV0QixNQUFNLEtBQUssR0FBSSxPQUFlLENBQUMsV0FBVyxDQUN4QyxtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLFVBQVUsQ0FDWCxDQUFBO1FBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLGNBQWMsQ0FBQyxDQUFBO1FBQzFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwyQkFBdUIsR0FBRSxDQUFBO1FBQ3RELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUV0RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNO1lBQ04sVUFBVTtZQUNWLGNBQWM7WUFDZCxLQUFLLEVBQUUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxtQ0FBSSxJQUFJO1lBQzdCLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQVcsQ0FBQTtnQkFFZixJQUFJO29CQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDbEM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsbUNBQW1DO29CQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQ3RDO2dCQUVELE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7d0JBQzFDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVWLE1BQU0sR0FBRyxHQUFHLFVBQVU7b0JBQ3BCLENBQUMsQ0FBQyxJQUFBLGdDQUFZLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO29CQUNqRSxDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVWLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUEvQ0Qsd0JBK0NDO0FBRUQsNkRBQTZEO0FBQzdELFNBQWdCLGVBQWUsQ0FBQyxPQUF3QjtJQUN0RCxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakMsSUFBSSxFQUFFLFlBQVk7WUFDbEIsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsT0FBTyxDQUFDLEtBQWlDO2dCQUN2QyxPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUM3QixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWhCRCwwQ0FnQkM7QUFFRCxTQUFnQixTQUFTLENBQ3ZCLGVBQW1DLFNBQVMsRUFDNUMsT0FBd0I7SUFFeEIsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjs7UUFFdEIsTUFBTSxLQUFLLEdBQUksT0FBZSxDQUFDLFdBQVcsQ0FDeEMsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixVQUFVLENBQ1gsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxjQUFjLENBQUMsQ0FBQTtRQUMxQyxNQUFNLG9CQUFvQixHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtRQUN0RCxNQUFNLGVBQWUsR0FDbkIsVUFBVSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUU5RCxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsS0FBSyxFQUFFLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUssbUNBQUksSUFBSTtZQUM3QixVQUFVO1lBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFnQztnQkFDNUMsSUFBSSxHQUFHLEdBQVEsWUFBWTtvQkFDekIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO29CQUMvQixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQTtnQkFFbkIsTUFBTSxTQUFTLEdBQUcsZUFBZTtvQkFDL0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt3QkFDdkMsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLFlBQVksRUFBRSxJQUFJO3FCQUNuQixDQUFDO29CQUNKLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRVAsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLGdDQUFZLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRWxFLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUE1Q0QsOEJBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBFdmVudEJyaWRnZUV2ZW50LCBBcHBTeW5jUmVzb2x2ZXJFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZXRhaWxPcHRpb25zIHtcbiAgcGFyc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERldGFpbChvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPSBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHBhcnNlOiBvcHRpb25zPy5wYXJzZSA/PyB0cnVlLFxuICAgICAgdGFyZ2V0VHlwZSxcbiAgICAgIGFzeW5jIHJlc29sdmUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgICAgIGxldCBwYXJzZWQ6IGFueVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShldmVudC5kZXRhaWwpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBUT0RPOiByZXBsYWNlIHdpdGggY3VzdG9tIGVycm9yc1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQm9keSBwYXJzaW5nIGVycm9yJylcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgID8gdmFsaWRhdG9yQ29uZmlnLnNjaGVtYS52YWxpZGF0ZVN5bmMocGFyc2VkLCB7XG4gICAgICAgICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgICAgICAgICAgICBzdHJpcFVua25vd246IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogcGFyc2VkXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZVxuICAgICAgICAgID8gcGxhaW5Ub0NsYXNzKHRhcmdldFR5cGUsIHZhbGlkYXRlZCwgeyBpZ25vcmVEZWNvcmF0b3JzOiB0cnVlIH0pXG4gICAgICAgICAgOiBwYXJzZWRcblxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50RGV0YWlsVHlwZShvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdkZXRhaWxUeXBlJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHJlc29sdmUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgICAgIHJldHVybiBldmVudFsnZGV0YWlsLXR5cGUnXVxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcmd1bWVudHMoXG4gIGFyZ3VtZW50TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuICBvcHRpb25zPzogSURldGFpbE9wdGlvbnNcbikge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9XG4gICAgICB0YXJnZXRUeXBlICYmIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdhcmd1bWVudCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICBwYXJzZTogb3B0aW9ucz8ucGFyc2UgPz8gdHJ1ZSxcbiAgICAgIHRhcmdldFR5cGUsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnk+KSB7XG4gICAgICAgIGxldCBhcmc6IGFueSA9IGFyZ3VtZW50TmFtZVxuICAgICAgICAgID8gZXZlbnQuYXJndW1lbnRzW2FyZ3VtZW50TmFtZV1cbiAgICAgICAgICA6IGV2ZW50LmFyZ3VtZW50c1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgID8gdmFsaWRhdG9yQ29uZmlnLnNjaGVtYS52YWxpZGF0ZVN5bmMoYXJnLCB7XG4gICAgICAgICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgICAgICAgICAgICBzdHJpcFVua25vd246IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogYXJnXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZSA/IHBsYWluVG9DbGFzcyh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQpIDogYXJnXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG4iXX0=