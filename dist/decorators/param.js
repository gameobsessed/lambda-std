"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = exports.DetailType = exports.Detail = void 0;
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
function Detail(options) {
    return function (object, methodName, parameterIndex) {
        var _a;
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types[parameterIndex];
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
                const obj = targetType ? (0, class_transformer_1.plainToClass)(targetType, validated) : parsed;
                return obj;
            },
        });
    };
}
exports.Detail = Detail;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DetailType(options) {
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
exports.DetailType = DetailType;
function Argument(argumentName, options) {
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
                let arg = event.arguments[argumentName];
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
exports.Argument = Argument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCOztRQUV0QixNQUFNLEtBQUssR0FBSSxPQUFlLENBQUMsV0FBVyxDQUN4QyxtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLFVBQVUsQ0FDWCxDQUFBO1FBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwyQkFBdUIsR0FBRSxDQUFBO1FBQ3RELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUV0RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNO1lBQ04sVUFBVTtZQUNWLGNBQWM7WUFDZCxLQUFLLEVBQUUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxtQ0FBSSxJQUFJO1lBQzdCLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQVcsQ0FBQTtnQkFFZixJQUFJO29CQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDbEM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsbUNBQW1DO29CQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQ3RDO2dCQUVELE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7d0JBQzFDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVWLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVyRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBN0NELHdCQTZDQztBQUVELDZEQUE2RDtBQUM3RCxTQUFnQixVQUFVLENBQUMsT0FBd0I7SUFDakQsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjtRQUV0QixJQUFBLDJCQUF1QixHQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLE9BQU8sQ0FBQyxLQUFpQztnQkFDdkMsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFoQkQsZ0NBZ0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLFlBQW9CLEVBQUUsT0FBd0I7SUFDckUsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjs7UUFFdEIsTUFBTSxLQUFLLEdBQUksT0FBZSxDQUFDLFdBQVcsQ0FDeEMsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixVQUFVLENBQ1gsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxjQUFjLENBQUMsQ0FBQTtRQUMxQyxNQUFNLG9CQUFvQixHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtRQUN0RCxNQUFNLGVBQWUsR0FDbkIsVUFBVSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUU5RCxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsS0FBSyxFQUFFLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUssbUNBQUksSUFBSTtZQUM3QixVQUFVO1lBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFnQztnQkFDNUMsSUFBSSxHQUFHLEdBQVEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFFNUMsTUFBTSxTQUFTLEdBQUcsZUFBZTtvQkFDL0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt3QkFDdkMsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLFlBQVksRUFBRSxJQUFJO3FCQUNuQixDQUFDO29CQUNKLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRVAsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLGdDQUFZLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRWxFLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUF2Q0QsNEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBFdmVudEJyaWRnZUV2ZW50LCBBcHBTeW5jUmVzb2x2ZXJFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZXRhaWxPcHRpb25zIHtcbiAgcGFyc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERldGFpbChvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXNbcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID0gY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2RldGFpbCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICBwYXJzZTogb3B0aW9ucz8ucGFyc2UgPz8gdHJ1ZSxcbiAgICAgIHRhcmdldFR5cGUsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICBsZXQgcGFyc2VkOiBhbnlcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoZXZlbnQuZGV0YWlsKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gVE9ETzogcmVwbGFjZSB3aXRoIGN1c3RvbSBlcnJvcnNcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvZHkgcGFyc2luZyBlcnJvcicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKHBhcnNlZCwge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IHBhcnNlZFxuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IHBhcnNlZFxuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5leHBvcnQgZnVuY3Rpb24gRGV0YWlsVHlwZShvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdkZXRhaWxUeXBlJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHJlc29sdmUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgICAgIHJldHVybiBldmVudFsnZGV0YWlsLXR5cGUnXVxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcmd1bWVudChhcmd1bWVudE5hbWU6IHN0cmluZywgb3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzPy5bcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID1cbiAgICAgIHRhcmdldFR5cGUgJiYgY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2FyZ3VtZW50JyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHBhcnNlOiBvcHRpb25zPy5wYXJzZSA/PyB0cnVlLFxuICAgICAgdGFyZ2V0VHlwZSxcbiAgICAgIGFzeW5jIHJlc29sdmUoZXZlbnQ6IEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueT4pIHtcbiAgICAgICAgbGV0IGFyZzogYW55ID0gZXZlbnQuYXJndW1lbnRzW2FyZ3VtZW50TmFtZV1cblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKGFyZywge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGFyZ1xuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IGFyZ1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19