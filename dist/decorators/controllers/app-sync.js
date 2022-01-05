"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncResolverEventController = exports.AppSyncResolverEventControllerClass = void 0;
const controller_1 = require("./controller");
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
function AppSyncResolverEventController(UserController) {
    const controller = new AppSyncResolverEventControllerClass(UserController);
    const handler = controller.handle.bind(controller);
    return async function executeHandler(...args) {
        let result;
        try {
            result = await handler(...args);
        }
        catch (error) {
            console.debug('Execute Handler Error');
            throw error;
        }
        return result;
    };
}
exports.AppSyncResolverEventController = AppSyncResolverEventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN5bmMuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9jb250cm9sbGVycy9hcHAtc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBd0U7QUFFeEUsTUFBYSxtQ0FBb0MsU0FBUSxpQ0FFeEQ7SUFDQyxjQUFjLENBQUMsS0FBcUM7O1FBQ2xELE9BQU8sTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUE7SUFDOUIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBcUMsRUFBRSxHQUFZOztRQUM5RCxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUN2QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNuRSxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMvRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWMsQ0FBQTtRQUVwQyxPQUFPLElBQUksS0FBSyxVQUFVO1lBQ3hCLENBQUMsQ0FBQztnQkFDRSxVQUFVLEVBQUUsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVywwQ0FBRSxJQUFJO2dCQUNyQyxHQUFHLE1BQU07YUFDVjtZQUNILENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDWixDQUFDO0NBQ0Y7QUFyQkQsa0ZBcUJDO0FBRUQsU0FBZ0IsOEJBQThCLENBQUMsY0FBbUM7SUFDaEYsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQ0FBbUMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMxRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUVsRCxPQUFPLEtBQUssVUFBVSxjQUFjLENBQUMsR0FBRyxJQUFnQjtRQUN0RCxJQUFJLE1BQU0sQ0FBQTtRQUVWLElBQUk7WUFDRixNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtTQUNoQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBQ3RDLE1BQU0sS0FBSyxDQUFBO1NBQ1o7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQVEsQ0FBQTtBQUNWLENBQUM7QUFoQkQsd0VBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3luY1Jlc29sdmVyRXZlbnQsIENvbnRleHQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgRXZlbnRDb250cm9sbGVyQ2xhc3MsIElVc2VyQ29udHJvbGxlckN0b3IgfSBmcm9tICcuL2NvbnRyb2xsZXInXG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT5cbj4ge1xuICBnZXRIYW5kbGVyTmFtZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50LmluZm8/LmZpZWxkTmFtZVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlKGlucHV0OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4sIGN0eDogQ29udGV4dCkge1xuICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZSgpXG4gICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5wcmVwcm9jZXNzKGlucHV0LCBjdHgpXG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMudXNlckNvbnRyb2xsZXJbdGhpcy5oYW5kbGVyQ29uZmlnIS5tZXRob2ROYW1lXVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZXIuYXBwbHkodGhpcy51c2VyQ29udHJvbGxlciwgcGFyYW1zKVxuICAgIGNvbnN0IHsgdHlwZSB9ID0gdGhpcy5oYW5kbGVyQ29uZmlnIVxuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdtdXRhdGlvbidcbiAgICAgID8ge1xuICAgICAgICAgIF9fdHlwZW5hbWU6IHJlc3VsdD8uY29uc3RydWN0b3I/Lm5hbWUsXG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICB9XG4gICAgICA6IHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXIoVXNlckNvbnRyb2xsZXI6IElVc2VyQ29udHJvbGxlckN0b3IpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyhVc2VyQ29udHJvbGxlcilcbiAgY29uc3QgaGFuZGxlciA9IGNvbnRyb2xsZXIuaGFuZGxlLmJpbmQoY29udHJvbGxlcilcblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUhhbmRsZXIoLi4uYXJnczogW2FueSwgYW55XSkge1xuICAgIGxldCByZXN1bHRcblxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKC4uLmFyZ3MpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ0V4ZWN1dGUgSGFuZGxlciBFcnJvcicpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfSBhcyBhbnlcbn1cbiJdfQ==