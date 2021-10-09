"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = exports.DetailType = exports.Detail = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0Q7QUFFaEQsMEJBQTRDO0FBTTVDLFNBQWdCLE1BQU0sQ0FBQyxPQUF3QjtJQUM3QyxPQUFPLFVBQ0wsTUFBYyxFQUNkLFVBQTJCLEVBQzNCLGNBQXNCOztRQUV0QixNQUFNLEtBQUssR0FBSSxPQUFlLENBQUMsV0FBVyxDQUN4QyxtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLFVBQVUsQ0FDWCxDQUFBO1FBQ0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwyQkFBdUIsR0FBRSxDQUFBO1FBQ3RELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUV0RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNO1lBQ04sVUFBVTtZQUNWLGNBQWM7WUFDZCxLQUFLLEVBQUUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxtQ0FBSSxJQUFJO1lBQzdCLFVBQVU7WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWlDO2dCQUM3QyxJQUFJLE1BQVcsQ0FBQTtnQkFFZixJQUFJO29CQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDbEM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsbUNBQW1DO29CQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQ3RDO2dCQUVELE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7d0JBQzFDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVWLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO2dCQUVyRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBN0NELHdCQTZDQztBQUVELDZEQUE2RDtBQUM3RCxTQUFnQixVQUFVLENBQUMsT0FBd0I7SUFDakQsT0FBTyxVQUNMLE1BQWMsRUFDZCxVQUEyQixFQUMzQixjQUFzQjtRQUV0QixJQUFBLDJCQUF1QixHQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLE9BQU8sQ0FBQyxLQUFpQztnQkFDdkMsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFoQkQsZ0NBZ0JDO0FBRUQsU0FBZ0IsU0FBUyxDQUN2QixlQUFtQyxTQUFTLEVBQzVDLE9BQXdCO0lBRXhCLE9BQU8sVUFDTCxNQUFjLEVBQ2QsVUFBMkIsRUFDM0IsY0FBc0I7O1FBRXRCLE1BQU0sS0FBSyxHQUFJLE9BQWUsQ0FBQyxXQUFXLENBQ3hDLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxDQUNYLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsY0FBYyxDQUFDLENBQUE7UUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDdEQsTUFBTSxlQUFlLEdBQ25CLFVBQVUsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFOUQsb0JBQW9CLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU07WUFDTixVQUFVO1lBQ1YsY0FBYztZQUNkLEtBQUssRUFBRSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLG1DQUFJLElBQUk7WUFDN0IsVUFBVTtZQUNWLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBZ0M7Z0JBQzVDLElBQUksR0FBRyxHQUFRLFlBQVk7b0JBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBRW5CLE1BQU0sU0FBUyxHQUFHLGVBQWU7b0JBQy9CLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZDLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFDSixDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVQLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBWSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUVsRSxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7QUFDSCxDQUFDO0FBNUNELDhCQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJ1xuaW1wb3J0IHsgRXZlbnRCcmlkZ2VFdmVudCwgQXBwU3luY1Jlc29sdmVyRXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGludGVyZmFjZSBJRGV0YWlsT3B0aW9ucyB7XG4gIHBhcnNlOiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZXRhaWwob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgdHlwZXMgPSAoUmVmbGVjdCBhcyBhbnkpLmdldE1ldGFkYXRhKFxuICAgICAgJ2Rlc2lnbjpwYXJhbXR5cGVzJyxcbiAgICAgIG9iamVjdCxcbiAgICAgIG1ldGhvZE5hbWVcbiAgICApXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IHR5cGVzW3BhcmFtZXRlckluZGV4XVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25TdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZyA9IGNvbmZpZ3VyYXRpb25TdG9yYWdlLmZpbmRWYWxpZGF0b3IodGFyZ2V0VHlwZSlcblxuICAgIGNvbmZpZ3VyYXRpb25TdG9yYWdlLmFkZFBhcmFtKHtcbiAgICAgIHR5cGU6ICdkZXRhaWwnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcGFyc2U6IG9wdGlvbnM/LnBhcnNlID8/IHRydWUsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogRXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4pIHtcbiAgICAgICAgbGV0IHBhcnNlZDogYW55XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwYXJzZWQgPSBKU09OLnBhcnNlKGV2ZW50LmRldGFpbClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIFRPRE86IHJlcGxhY2Ugd2l0aCBjdXN0b20gZXJyb3JzXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb2R5IHBhcnNpbmcgZXJyb3InKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGVkID0gdmFsaWRhdG9yQ29uZmlnXG4gICAgICAgICAgPyB2YWxpZGF0b3JDb25maWcuc2NoZW1hLnZhbGlkYXRlU3luYyhwYXJzZWQsIHtcbiAgICAgICAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXG4gICAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgOiBwYXJzZWRcblxuICAgICAgICBjb25zdCBvYmogPSB0YXJnZXRUeXBlID8gcGxhaW5Ub0NsYXNzKHRhcmdldFR5cGUsIHZhbGlkYXRlZCkgOiBwYXJzZWRcblxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGZ1bmN0aW9uIERldGFpbFR5cGUob3B0aW9ucz86IElEZXRhaWxPcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nIHwgc3ltYm9sLFxuICAgIHBhcmFtZXRlckluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnZGV0YWlsVHlwZScsXG4gICAgICBvYmplY3QsXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgcGFyYW1ldGVySW5kZXgsXG4gICAgICByZXNvbHZlKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgICAgICByZXR1cm4gZXZlbnRbJ2RldGFpbC10eXBlJ11cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJndW1lbnRzKFxuICBhcmd1bWVudE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgb3B0aW9ucz86IElEZXRhaWxPcHRpb25zXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICBvYmplY3Q6IE9iamVjdCxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgcGFyYW1ldGVySW5kZXg6IG51bWJlclxuICApIHtcbiAgICBjb25zdCB0eXBlcyA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXG4gICAgICAnZGVzaWduOnBhcmFtdHlwZXMnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZVxuICAgIClcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gdHlwZXM/LltwYXJhbWV0ZXJJbmRleF1cbiAgICBjb25zdCBjb25maWd1cmF0aW9uU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICBjb25zdCB2YWxpZGF0b3JDb25maWcgPVxuICAgICAgdGFyZ2V0VHlwZSAmJiBjb25maWd1cmF0aW9uU3RvcmFnZS5maW5kVmFsaWRhdG9yKHRhcmdldFR5cGUpXG5cbiAgICBjb25maWd1cmF0aW9uU3RvcmFnZS5hZGRQYXJhbSh7XG4gICAgICB0eXBlOiAnYXJndW1lbnQnLFxuICAgICAgb2JqZWN0LFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtZXRlckluZGV4LFxuICAgICAgcGFyc2U6IG9wdGlvbnM/LnBhcnNlID8/IHRydWUsXG4gICAgICB0YXJnZXRUeXBlLFxuICAgICAgYXN5bmMgcmVzb2x2ZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pikge1xuICAgICAgICBsZXQgYXJnOiBhbnkgPSBhcmd1bWVudE5hbWVcbiAgICAgICAgICA/IGV2ZW50LmFyZ3VtZW50c1thcmd1bWVudE5hbWVdXG4gICAgICAgICAgOiBldmVudC5hcmd1bWVudHNcblxuICAgICAgICBjb25zdCB2YWxpZGF0ZWQgPSB2YWxpZGF0b3JDb25maWdcbiAgICAgICAgICA/IHZhbGlkYXRvckNvbmZpZy5zY2hlbWEudmFsaWRhdGVTeW5jKGFyZywge1xuICAgICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgc3RyaXBVbmtub3duOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGFyZ1xuXG4gICAgICAgIGNvbnN0IG9iaiA9IHRhcmdldFR5cGUgPyBwbGFpblRvQ2xhc3ModGFyZ2V0VHlwZSwgdmFsaWRhdGVkKSA6IGFyZ1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19