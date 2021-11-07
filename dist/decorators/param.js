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
                        ? await validatorConfig.schema.validate(arg, {
                            abortEarly: false,
                            stripUnknown: true,
                        })
                        : arg;
                }
                catch (error) {
                    console.warn('argument.resolve.error', error);
                    throw error;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXRFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQU0sR0FBUSxLQUFLLENBQUMsTUFBTSxDQUFBO2dCQUU5QixNQUFNLFNBQVMsR0FBRyxlQUFlO29CQUMvQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUMxQyxVQUFVLEVBQUUsS0FBSzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ25CLENBQUM7b0JBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixNQUFNLEdBQUcsR0FBRyxVQUFVO29CQUNwQixDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFD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QTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQ25CLFVBQVUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFOUQsSUFBQSwyQkFBdUIsR0FBRSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNO1lBQ04sVUFBVTtZQUNWLGNBQWM7WUFDZCxPQUFPLENBQUMsS0FBVTtnQkFDaEIsTUFBTSxHQUFHLEdBQVEsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtnQkFDckQsTUFBTSxTQUFTLEdBQUcsZUFBZTtvQkFDL0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt3QkFDdkMsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLFlBQVksRUFBRSxJQUFJO3FCQUNuQixDQUFDO29CQUNKLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRVAsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLGdDQUFZLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRWxFLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFwQ0Qsa0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBFdmVudEJyaWRnZUV2ZW50LCBBcHBTeW5jUmVzb2x2ZXJFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZXRhaWxPcHRpb25zIHtcbiAgcGFyc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERldGFpbChvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPSBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHRhcmdldFR5cGUsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICBsZXQgcGFyc2VkOiBhbnkgPSBldmVudC5kZXRhaWxcblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKHBhcnNlZCwge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IHBhcnNlZFxuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGVcbiAgICAgICAgICA/IHBsYWluVG9DbGFzcyh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQsIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KVxuICAgICAgICAgIDogcGFyc2VkXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBmdW5jdGlvbiBFdmVudERldGFpbFR5cGUob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsVHlwZScsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICByZXR1cm4gZXZlbnRbJ2RldGFpbC10eXBlJ11cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJndW1lbnRzKFxuICBhcmd1bWVudE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgb3B0aW9ucz86IElEZXRhaWxPcHRpb25zXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPVxuICAgICAgdGFyZ2V0VHlwZSAmJiBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnYXJndW1lbnQnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcGFyc2U6IG9wdGlvbnM/LnBhcnNlID8/IHRydWUsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pikge1xuICAgICAgICBjb25zb2xlLmxvZygnYXJndW1lbnQucmVzb2x2ZS5lbnRlcicsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcbiAgICAgICAgbGV0IGFyZzogYW55ID0gYXJndW1lbnROYW1lXG4gICAgICAgICAgPyBldmVudC5hcmd1bWVudHNbYXJndW1lbnROYW1lXVxuICAgICAgICAgIDogZXZlbnQuYXJndW1lbnRzXG5cbiAgICAgICAgbGV0IHZhbGlkYXRlZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgICAgPyBhd2FpdCB2YWxpZGF0b3JDb25maWcuc2NoZW1hLnZhbGlkYXRlKGFyZywge1xuICAgICAgICAgICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogYXJnXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdhcmd1bWVudC5yZXNvbHZlLmVycm9yJywgZXJyb3IpXG4gICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICdhcmd1bWVudC5yZXNvbHZlLnZhbGlkYXRlZCcsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsaWRhdGVkLCBudWxsLCAyKVxuICAgICAgICApXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZSA/IHBsYWluVG9DbGFzcyh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQpIDogYXJnXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudFJlY29yZChleHRyYWN0b3I/OiAocmVjb3JkOiBhbnkpID0+IGFueSkge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9XG4gICAgICB0YXJnZXRUeXBlICYmIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkUGFyYW0oe1xuICAgICAgdHlwZTogJ2V2ZW50UmVjb3JkJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHJlc29sdmUoZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBhcmc6IGFueSA9IGV4dHJhY3RvciA/IGV4dHJhY3RvcihldmVudCkgOiBldmVudFxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKGFyZywge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGFyZ1xuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IGFyZ1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19