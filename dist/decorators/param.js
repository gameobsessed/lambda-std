"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRecord = exports.Source = exports.Arguments = exports.EventDetailType = exports.Detail = void 0;
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
                const parsed = event.detail;
                const validated = validatorConfig
                    ? await validatorConfig.validate(parsed)
                    : parsed;
                const obj = targetType
                    ? (0, class_transformer_1.plainToInstance)(targetType, validated, { ignoreDecorators: true })
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
                const arg = argumentName
                    ? event.arguments[argumentName]
                    : event.arguments;
                const validated = validatorConfig
                    ? await validatorConfig.validate(arg)
                    : arg;
                console.log('argument.resolve.validated', JSON.stringify(validated, null, 2));
                const obj = targetType ? (0, class_transformer_1.plainToInstance)(targetType, validated) : arg;
                return obj;
            },
        });
    };
}
exports.Arguments = Arguments;
function Source(options) {
    return function (object, methodName, parameterIndex) {
        var _a;
        const types = Reflect.getMetadata('design:paramtypes', object, methodName);
        const targetType = types === null || types === void 0 ? void 0 : types[parameterIndex];
        const configurationStorage = (0, __1.getConfigurationStorage)();
        const validatorConfig = targetType && configurationStorage.findValidator(targetType);
        configurationStorage.addParam({
            type: 'source',
            object,
            methodName,
            parameterIndex,
            parse: (_a = options === null || options === void 0 ? void 0 : options.parse) !== null && _a !== void 0 ? _a : true,
            targetType,
            async resolve(event) {
                console.debug('source.resolve.enter', JSON.stringify(event, null, 2));
                const { source } = event;
                const validated = validatorConfig
                    ? await validatorConfig.validate(source)
                    : source;
                console.debug('source.resolve.validated', JSON.stringify(validated, null, 2));
                const obj = targetType ? (0, class_transformer_1.plainToInstance)(targetType, validated) : source;
                return obj;
            },
        });
    };
}
exports.Source = Source;
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
            async resolve(event) {
                const arg = extractor ? extractor(event) : event;
                const validated = validatorConfig
                    ? await validatorConfig.validate(arg)
                    : arg;
                const obj = targetType ? (0, class_transformer_1.plainToInstance)(targetType, validated) : arg;
                return obj;
            },
        });
    };
}
exports.EventRecord = EventRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBbUQ7QUFFbkQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCO1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXRFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxNQUFNLE1BQU0sR0FBUSxLQUFLLENBQUMsTUFBTSxDQUFBO2dCQUVoQyxNQUFNLFNBQVMsR0FBRyxlQUFlO29CQUMvQixDQUFDLENBQUMsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixNQUFNLEdBQUcsR0FBRyxVQUFVO29CQUNwQixDQUFDLENBQUMsSUFBQSxtQ0FBZSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDcEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFVixPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixD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VUFBVSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxjQUFjLENBQUMsQ0FBQTtRQUMxQyxNQUFNLG9CQUFvQixHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtRQUN0RCxNQUFNLGVBQWUsR0FDbkIsVUFBVSxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUU5RCxJQUFBLDJCQUF1QixHQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBVTtnQkFDdEIsTUFBTSxHQUFHLEdBQVEsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtnQkFDckQsTUFBTSxTQUFTLEdBQUcsZUFBZTtvQkFDL0IsQ0FBQyxDQUFDLE1BQU0sZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7b0JBQ3JDLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRVAsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLG1DQUFlLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBRXJFLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFqQ0Qsa0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxhaW5Ub0luc3RhbmNlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInXG5pbXBvcnQgeyBFdmVudEJyaWRnZUV2ZW50LCBBcHBTeW5jUmVzb2x2ZXJFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZXRhaWxPcHRpb25zIHtcbiAgcGFyc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERldGFpbChvcHRpb25zPzogSURldGFpbE9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPSBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbWV0ZXJJbmRleCxcbiAgICAgIHRhcmdldFR5cGUsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICBjb25zdCBwYXJzZWQ6IGFueSA9IGV2ZW50LmRldGFpbFxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZCA9IHZhbGlkYXRvckNvbmZpZ1xuICAgICAgICAgID8gYXdhaXQgdmFsaWRhdG9yQ29uZmlnLnZhbGlkYXRlKHBhcnNlZClcbiAgICAgICAgICA6IHBhcnNlZFxuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGVcbiAgICAgICAgICA/IHBsYWluVG9JbnN0YW5jZSh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQsIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KVxuICAgICAgICAgIDogcGFyc2VkXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBmdW5jdGlvbiBFdmVudERldGFpbFR5cGUob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsVHlwZScsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICByZXR1cm4gZXZlbnRbJ2RldGFpbC10eXBlJ11cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJndW1lbnRzKFxuICBhcmd1bWVudE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgb3B0aW9ucz86IElEZXRhaWxPcHRpb25zXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPVxuICAgICAgdGFyZ2V0VHlwZSAmJiBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnYXJndW1lbnQnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcGFyc2U6IG9wdGlvbnM/LnBhcnNlID8/IHRydWUsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pikge1xuICAgICAgICBjb25zb2xlLmxvZygnYXJndW1lbnQucmVzb2x2ZS5lbnRlcicsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcbiAgICAgICAgY29uc3QgYXJnOiBhbnkgPSBhcmd1bWVudE5hbWVcbiAgICAgICAgICA/IGV2ZW50LmFyZ3VtZW50c1thcmd1bWVudE5hbWVdXG4gICAgICAgICAgOiBldmVudC5hcmd1bWVudHNcblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IGF3YWl0IHZhbGlkYXRvckNvbmZpZy52YWxpZGF0ZShhcmcpXG4gICAgICAgICAgOiBhcmdcblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAnYXJndW1lbnQucmVzb2x2ZS52YWxpZGF0ZWQnLFxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbGlkYXRlZCwgbnVsbCwgMilcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvSW5zdGFuY2UodGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IGFyZ1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU291cmNlKG9wdGlvbnM/OiBJRGV0YWlsT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIG9iamVjdDogT2JqZWN0LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICBwYXJhbWV0ZXJJbmRleDogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IHR5cGVzID0gKFJlZmxlY3QgYXMgYW55KS5nZXRNZXRhZGF0YShcbiAgICAgICdkZXNpZ246cGFyYW10eXBlcycsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lXG4gICAgKVxuICAgIGNvbnN0IHRhcmdldFR5cGUgPSB0eXBlcz8uW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9XG4gICAgICB0YXJnZXRUeXBlICYmIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdzb3VyY2UnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcGFyc2U6IG9wdGlvbnM/LnBhcnNlID8/IHRydWUsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pikge1xuICAgICAgICBjb25zb2xlLmRlYnVnKCdzb3VyY2UucmVzb2x2ZS5lbnRlcicsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcbiAgICAgICAgY29uc3QgeyBzb3VyY2UgfTogYW55ID0gZXZlbnRcblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IGF3YWl0IHZhbGlkYXRvckNvbmZpZy52YWxpZGF0ZShzb3VyY2UpXG4gICAgICAgICAgOiBzb3VyY2VcblxuICAgICAgICBjb25zb2xlLmRlYnVnKFxuICAgICAgICAgICdzb3VyY2UucmVzb2x2ZS52YWxpZGF0ZWQnLFxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbGlkYXRlZCwgbnVsbCwgMilcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvSW5zdGFuY2UodGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IHNvdXJjZVxuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRSZWNvcmQoZXh0cmFjdG9yPzogKHJlY29yZDogYW55KSA9PiBhbnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPVxuICAgICAgdGFyZ2V0VHlwZSAmJiBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdldmVudFJlY29yZCcsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICBhc3luYyByZXNvbHZlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgYXJnOiBhbnkgPSBleHRyYWN0b3IgPyBleHRyYWN0b3IoZXZlbnQpIDogZXZlbnRcbiAgICAgICAgY29uc3QgdmFsaWRhdGVkID0gdmFsaWRhdG9yQ29uZmlnXG4gICAgICAgICAgPyBhd2FpdCB2YWxpZGF0b3JDb25maWcudmFsaWRhdGUoYXJnKVxuICAgICAgICAgIDogYXJnXG5cbiAgICAgICAgY29uc3Qgb2JqID0gdGFyZ2V0VHlwZSA/IHBsYWluVG9JbnN0YW5jZSh0YXJnZXRUeXBlLCB2YWxpZGF0ZWQpIDogYXJnXG5cbiAgICAgICAgcmV0dXJuIG9ialxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG4iXX0=