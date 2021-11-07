"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRecord = exports.Arguments = exports.EventDetailType = exports.Detail = void 0;
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
                console.log('argument.resolve.enter', JSON.stringify(event, null, 2));
                let arg = argumentName
                    ? event.arguments[argumentName]
                    : event.arguments;
                let validated;
                try {
                    validated = validatorConfig
                        ? validatorConfig.schema.validateSync(arg, {
                            abortEarly: false,
                            stripUnknown: true,
                        })
                        : arg;
                }
                catch (error) {
                    console.warn('argument.resolve.error', error);
                }
                console.log('argument.resolve.validated', JSON.stringify(validated, null, 2));
                const obj = targetType ? (0, class_transformer_1.plainToClass)(targetType, validated) : arg;
                return obj;
            },
        });
    };
}
exports.Arguments = Arguments;
function EventRecord(extractor) {
    return function (object, methodName, parameterIndex) {
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types === null || types === void 0 ? void 0 : types[parameterIndex];
        const configurationStorage = (0, __1.getConfigurationStorage)();
        const validatorConfig = targetType && configurationStorage.findValidator(targetType);
        (0, __1.getConfigurationStorage)().addParam({
            type: 'eventRecord',
            object,
            methodName,
            parameterIndex,
            resolve(event) {
                const arg = extractor ? extractor(event) : event;
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
exports.EventRecord = EventRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXRFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQU0sR0FBUSxLQUFLLENBQUMsTUFBTSxDQUFBO2dCQUU5QixNQUFNLFNBQVMsR0FBRyxlQUFlO29CQUMvQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUMxQyxVQUFVLEVBQUUsS0FBSzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ25CLENBQUM7b0JBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixNQUFNLEdBQUcsR0FBRyxVQUFVO29CQUNwQixDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFD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LEtBQUssR0FBSSxPQUFlLENBQUMsV0FBVyxDQUN4QyxtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLFVBQVUsQ0FDWCxDQUFBO1FBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLGNBQWMsQ0FBQyxDQUFBO1FBQzFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwyQkFBdUIsR0FBRSxDQUFBO1FBQ3RELE1BQU0sZUFBZSxHQUNuQixVQUFVLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTlELElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakMsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsT0FBTyxDQUFDLEtBQVU7Z0JBQ2hCLE1BQU0sR0FBRyxHQUFRLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7Z0JBQ3JELE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVQLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVsRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBcENELGtDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgRXZlbnRCcmlkZ2VFdmVudCwgQXBwU3luY1Jlc29sdmVyRXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGludGVyZmFjZSBJRGV0YWlsT3B0aW9ucyB7XG4gIHBhcnNlOiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZXRhaWwob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzPy5bcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID0gY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2RldGFpbCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogRXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4pIHtcbiAgICAgICAgbGV0IHBhcnNlZDogYW55ID0gZXZlbnQuZGV0YWlsXG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGVkID0gdmFsaWRhdG9yQ29uZmlnXG4gICAgICAgICAgPyB2YWxpZGF0b3JDb25maWcuc2NoZW1hLnZhbGlkYXRlU3luYyhwYXJzZWQsIHtcbiAgICAgICAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXG4gICAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBwYXJzZWRcblxuICAgICAgICBjb25zdCBvYmogPSB0YXJnZXRUeXBlXG4gICAgICAgICAgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkLCB7IGlnbm9yZURlY29yYXRvcnM6IHRydWUgfSlcbiAgICAgICAgICA6IHBhcnNlZFxuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5leHBvcnQgZnVuY3Rpb24gRXZlbnREZXRhaWxUeXBlKG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2RldGFpbFR5cGUnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcmVzb2x2ZShldmVudDogRXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4pIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50WydkZXRhaWwtdHlwZSddXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFyZ3VtZW50cyhcbiAgYXJndW1lbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gIG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9uc1xuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzPy5bcGFyYW1ldGVySW5kZXhdXG4gICAgY29uc3QgY29uZmlndXJhdGlvblN0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgdmFsaWRhdG9yQ29uZmlnID1cbiAgICAgIHRhcmdldFR5cGUgJiYgY29uZmlndXJhdGlvblN0b3JhZ2UuZmluZFZhbGlkYXRvcih0YXJnZXRUeXBlKVxuXG4gICAgY29uZmlndXJhdGlvblN0b3JhZ2UuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2FyZ3VtZW50JyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHBhcnNlOiBvcHRpb25zPy5wYXJzZSA/PyB0cnVlLFxuICAgICAgdGFyZ2V0VHlwZSxcbiAgICAgIGFzeW5jIHJlc29sdmUoZXZlbnQ6IEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueT4pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FyZ3VtZW50LnJlc29sdmUuZW50ZXInLCBKU09OLnN0cmluZ2lmeShldmVudCwgbnVsbCwgMikpXG4gICAgICAgIGxldCBhcmc6IGFueSA9IGFyZ3VtZW50TmFtZVxuICAgICAgICAgID8gZXZlbnQuYXJndW1lbnRzW2FyZ3VtZW50TmFtZV1cbiAgICAgICAgICA6IGV2ZW50LmFyZ3VtZW50c1xuXG4gICAgICAgIGxldCB2YWxpZGF0ZWRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICAgID8gdmFsaWRhdG9yQ29uZmlnLnNjaGVtYS52YWxpZGF0ZVN5bmMoYXJnLCB7XG4gICAgICAgICAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBhcmdcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2FyZ3VtZW50LnJlc29sdmUuZXJyb3InLCBlcnJvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICdhcmd1bWVudC5yZXNvbHZlLnZhbGlkYXRlZCcsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsaWRhdGVkLCBudWxsLCAyKVxuICAgICAgICApXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZSA/IHBsYWluVG9DbGFzcyh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQpIDogYXJnXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudFJlY29yZChleHRyYWN0b3I/OiAocmVjb3JkOiBhbnkpID0+IGFueSkge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9XG4gICAgICB0YXJnZXRUeXBlICYmIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2V2ZW50UmVjb3JkJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHJlc29sdmUoZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBhcmc6IGFueSA9IGV4dHJhY3RvciA/IGV4dHJhY3RvcihldmVudCkgOiBldmVudFxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKGFyZywge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGFyZ1xuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IGFyZ1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19