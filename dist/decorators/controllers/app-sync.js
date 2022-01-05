"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncResolverEventController = exports.AppSyncResolverEventControllerClass = void 0;
const controller_1 = require("./controller");
const error_handler_1 = require("./error-handler");
class AppSyncResolverEventControllerClass extends controller_1.EventControllerClass {
    getHandlerName(event) {
        var _a;
        return (_a = event.info) === null || _a === void 0 ? void 0 : _a.fieldName;
    }
    async handle(input, ctx) {
        var _a;
        await this.initialize();
        const params = await this.preprocess(input, ctx);
        const handler = this.userController[this.handlerConfig.methodName];
        const result = await handler.apply(this.userController, params);
        const { type } = this.handlerConfig;
        return type === 'mutation'
            ? {
                __typename: (_a = result === null || result === void 0 ? void 0 : result.constructor) === null || _a === void 0 ? void 0 : _a.name,
                ...result,
            }
            : result;
    }
}
exports.AppSyncResolverEventControllerClass = AppSyncResolverEventControllerClass;
function AppSyncResolverEventController({ errorHandler = error_handler_1.defaultErrorHandler, } = {}) {
    return function AppSyncResolverEventController(UserController) {
        const controller = new AppSyncResolverEventControllerClass(UserController);
        const handler = controller.handle.bind(controller);
        return async function executeAppSyncResolverEventHandler(...args) {
            let result;
            try {
                result = await handler(...args);
            }
            catch (error) {
                return errorHandler(error);
            }
            return result;
        };
    };
}
exports.AppSyncResolverEventController = AppSyncResolverEventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN5bmMuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9jb250cm9sbGVycy9hcHAtc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBd0U7QUFDeEUsbURBQW9FO0FBRXBFLE1BQWEsbUNBQW9DLFNBQVEsaUNBRXhEO0lBQ0MsY0FBYyxDQUFDLEtBQXFDOztRQUNsRCxPQUFPLE1BQUEsS0FBSyxDQUFDLElBQUksMENBQUUsU0FBUyxDQUFBO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQXFDLEVBQUUsR0FBWTs7UUFDOUQsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDdkIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDL0QsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFjLENBQUE7UUFFcEMsT0FBTyxJQUFJLEtBQUssVUFBVTtZQUN4QixDQUFDLENBQUM7Z0JBQ0UsVUFBVSxFQUFFLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsMENBQUUsSUFBSTtnQkFDckMsR0FBRyxNQUFNO2FBQ1Y7WUFDSCxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ1osQ0FBQztDQUNGO0FBckJELGtGQXFCQztBQU1ELFNBQWdCLDhCQUE4QixDQUFDLEVBQzdDLFlBQVksR0FBRyxtQ0FBbUIsTUFDTyxFQUFFO0lBQzNDLE9BQU8sU0FBUyw4QkFBOEIsQ0FDNUMsY0FBbUM7UUFFbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQ0FBbUMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMxRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUVsRCxPQUFPLEtBQUssVUFBVSxrQ0FBa0MsQ0FDdEQsR0FBRyxJQUFnQjtZQUVuQixJQUFJLE1BQU0sQ0FBQTtZQUVWLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7YUFDaEM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUMzQjtZQUVELE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBUSxDQUFBO0lBQ1YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQXZCRCx3RUF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBTeW5jUmVzb2x2ZXJFdmVudCwgQ29udGV4dCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBFdmVudENvbnRyb2xsZXJDbGFzcywgSVVzZXJDb250cm9sbGVyQ3RvciB9IGZyb20gJy4vY29udHJvbGxlcidcbmltcG9ydCB7IGRlZmF1bHRFcnJvckhhbmRsZXIsIElFcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWhhbmRsZXInXG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT5cbj4ge1xuICBnZXRIYW5kbGVyTmFtZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50LmluZm8/LmZpZWxkTmFtZVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlKGlucHV0OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4sIGN0eDogQ29udGV4dCkge1xuICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZSgpXG4gICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5wcmVwcm9jZXNzKGlucHV0LCBjdHgpXG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMudXNlckNvbnRyb2xsZXJbdGhpcy5oYW5kbGVyQ29uZmlnIS5tZXRob2ROYW1lXVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZXIuYXBwbHkodGhpcy51c2VyQ29udHJvbGxlciwgcGFyYW1zKVxuICAgIGNvbnN0IHsgdHlwZSB9ID0gdGhpcy5oYW5kbGVyQ29uZmlnIVxuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdtdXRhdGlvbidcbiAgICAgID8ge1xuICAgICAgICAgIF9fdHlwZW5hbWU6IHJlc3VsdD8uY29uc3RydWN0b3I/Lm5hbWUsXG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICB9XG4gICAgICA6IHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlclBhcmFtcyB7XG4gIGVycm9ySGFuZGxlcj86IElFcnJvckhhbmRsZXI8YW55PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyKHtcbiAgZXJyb3JIYW5kbGVyID0gZGVmYXVsdEVycm9ySGFuZGxlcixcbn06IElBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJQYXJhbXMgPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyKFxuICAgIFVzZXJDb250cm9sbGVyOiBJVXNlckNvbnRyb2xsZXJDdG9yXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MoVXNlckNvbnRyb2xsZXIpXG4gICAgY29uc3QgaGFuZGxlciA9IGNvbnRyb2xsZXIuaGFuZGxlLmJpbmQoY29udHJvbGxlcilcblxuICAgIHJldHVybiBhc3luYyBmdW5jdGlvbiBleGVjdXRlQXBwU3luY1Jlc29sdmVyRXZlbnRIYW5kbGVyKFxuICAgICAgLi4uYXJnczogW2FueSwgYW55XVxuICAgICkge1xuICAgICAgbGV0IHJlc3VsdFxuXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKC4uLmFyZ3MpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKGVycm9yKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSBhcyBhbnlcbiAgfVxufVxuIl19