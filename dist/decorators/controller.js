"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncResolverEventController = exports.AppSyncResolverEventControllerClass = exports.EventBridgeEventController = exports.EventBridgeEventControllerClass = exports.EventControllerClass = exports.Controller = void 0;
const __1 = require("..");
function Controller(Wrapper) {
    const configStorage = (0, __1.getConfigurationStorage)();
    const handlerConfig = configStorage.findHandler(Wrapper);
    if (!handlerConfig) {
        throw new Error('One handler should be defined on the controller');
    }
    const initializerConfig = configStorage.findInitializer(Wrapper);
    const wrapper = new Wrapper();
    const handler = wrapper[handlerConfig.methodName];
    const initializer = initializerConfig && wrapper[initializerConfig === null || initializerConfig === void 0 ? void 0 : initializerConfig.methodName];
    const params = configStorage.findParams(Wrapper, handlerConfig.methodName);
    let initialized = false;
    return async function (event, context) {
        if (!initialized && initializerConfig) {
            await initializer.call(wrapper);
            initialized = true;
        }
        const args = [];
        try {
            for (const param of params) {
                args[param.parameterIndex] = await param.resolve(event, context);
            }
            return await handler.apply(wrapper, args);
        }
        catch (error) {
            console.error(error);
        }
    };
}
exports.Controller = Controller;
class EventControllerClass {
    constructor(Wrapper) {
        this.initialized = false;
        this.configStorage = (0, __1.getConfigurationStorage)();
        this.Wrapper = Wrapper;
        this.wrapper = new Wrapper();
        const initializerConfig = this.configStorage.findInitializer(Wrapper);
        this.initializer =
            initializerConfig && this.wrapper[initializerConfig.methodName];
    }
    async handler(event, context) {
        console.debug('event: ', JSON.stringify(event, null, 2));
        if (!this.initialized && this.initializer) {
            await this.initializer.call(this.wrapper);
            this.initialized = true;
        }
        const handlerName = this.getHandlerName(event);
        const handlerConfig = this.configStorage.findHandler(this.Wrapper, handlerName);
        if (!handlerConfig) {
            throw new Error(`There is no handler for the ${handlerName} defined on the controller`);
        }
        const handler = this.wrapper[handlerConfig.methodName];
        const params = this.configStorage.findParams(this.Wrapper, handlerConfig.methodName);
        const args = [];
        try {
            for (const param of params) {
                args[param.parameterIndex] = await param.resolve(event, context);
            }
            return await handler.apply(this.wrapper, args);
        }
        catch (error) {
            // TODO: should be proper error handling mechanism depending on service
            console.error(error);
        }
    }
}
exports.EventControllerClass = EventControllerClass;
class EventBridgeEventControllerClass extends EventControllerClass {
    getHandlerName(event) {
        return event['detail-type'];
    }
}
exports.EventBridgeEventControllerClass = EventBridgeEventControllerClass;
function EventBridgeEventController(Wrapper) {
    const controller = new EventBridgeEventControllerClass(Wrapper);
    return controller.handler.bind(controller);
}
exports.EventBridgeEventController = EventBridgeEventController;
class AppSyncResolverEventControllerClass extends EventControllerClass {
    getHandlerName(event) {
        var _a;
        return (_a = event.info) === null || _a === void 0 ? void 0 : _a.fieldName;
    }
}
exports.AppSyncResolverEventControllerClass = AppSyncResolverEventControllerClass;
function AppSyncResolverEventController(Wrapper) {
    const controller = new AppSyncResolverEventControllerClass(Wrapper);
    return controller.handler.bind(controller);
}
exports.AppSyncResolverEventController = AppSyncResolverEventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMEJBQWtFO0FBRWxFLFNBQWdCLFVBQVUsQ0FBSSxPQUFZO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO0tBQ25FO0lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhFLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNqRCxNQUFNLFdBQVcsR0FDZixpQkFBaUIsSUFBSSxPQUFPLENBQUMsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsVUFBVSxDQUFDLENBQUE7SUFDN0QsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRTFFLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUV2QixPQUFPLEtBQUssV0FBVyxLQUFRLEVBQUUsT0FBZ0I7UUFDL0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQTtTQUNuQjtRQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUVmLElBQUk7WUFDRixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ2pFO1lBRUQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQzFDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3JCO0lBQ0gsQ0FBUSxDQUFBO0FBQ1YsQ0FBQztBQW5DRCxnQ0FtQ0M7QUFFRCxNQUFzQixvQkFBb0I7SUFVeEMsWUFBWSxPQUFZO1FBRmhCLGdCQUFXLEdBQVksS0FBSyxDQUFBO1FBR2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBQSwyQkFBdUIsR0FBRSxDQUFBO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQTtRQUM1QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxXQUFXO1lBQ2QsaUJBQWlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBSUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFRLEVBQUUsT0FBZ0I7UUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN6QyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtTQUN4QjtRQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFOUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQ2xELElBQUksQ0FBQyxPQUFPLEVBQ1osV0FBVyxDQUNaLENBQUE7UUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ2IsK0JBQStCLFdBQVcsNEJBQTRCLENBQ3ZFLENBQUE7U0FDRjtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUMxQyxJQUFJLENBQUMsT0FBTyxFQUNaLGFBQWEsQ0FBQyxVQUFVLENBQ3pCLENBQUE7UUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7UUFFZixJQUFJO1lBQ0YsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTthQUNqRTtZQUVELE9BQU8sTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDL0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHVFQUF1RTtZQUN2RSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGO0FBN0RELG9EQTZEQztBQUVELE1BQWEsK0JBQWdDLFNBQVEsb0JBR3BEO0lBQ0MsY0FBYyxDQUFDLEtBQWlDO1FBQzlDLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRjtBQVBELDBFQU9DO0FBRUQsU0FBZ0IsMEJBQTBCLENBQUMsT0FBWTtJQUNyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRS9ELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUE7QUFDbkQsQ0FBQztBQUpELGdFQUlDO0FBRUQsTUFBYSxtQ0FBb0MsU0FBUSxvQkFHeEQ7SUFDQyxjQUFjLENBQUMsS0FBcUM7O1FBQ2xELE9BQU8sTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUE7SUFDOUIsQ0FBQztDQUNGO0FBUEQsa0ZBT0M7QUFFRCxTQUFnQiw4QkFBOEIsQ0FBQyxPQUFZO0lBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksbUNBQW1DLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFbkUsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtBQUNuRCxDQUFDO0FBSkQsd0VBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZXh0LCBBcHBTeW5jUmVzb2x2ZXJFdmVudCwgRXZlbnRCcmlkZ2VFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU3RvcmFnZSwgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xsZXI8VD4oV3JhcHBlcjogYW55KSB7XG4gIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gIGNvbnN0IGhhbmRsZXJDb25maWcgPSBjb25maWdTdG9yYWdlLmZpbmRIYW5kbGVyKFdyYXBwZXIpXG5cbiAgaWYgKCFoYW5kbGVyQ29uZmlnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmUgaGFuZGxlciBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY29udHJvbGxlcicpXG4gIH1cbiAgY29uc3QgaW5pdGlhbGl6ZXJDb25maWcgPSBjb25maWdTdG9yYWdlLmZpbmRJbml0aWFsaXplcihXcmFwcGVyKVxuXG4gIGNvbnN0IHdyYXBwZXIgPSBuZXcgV3JhcHBlcigpXG4gIGNvbnN0IGhhbmRsZXIgPSB3cmFwcGVyW2hhbmRsZXJDb25maWcubWV0aG9kTmFtZV1cbiAgY29uc3QgaW5pdGlhbGl6ZXIgPVxuICAgIGluaXRpYWxpemVyQ29uZmlnICYmIHdyYXBwZXJbaW5pdGlhbGl6ZXJDb25maWc/Lm1ldGhvZE5hbWVdXG4gIGNvbnN0IHBhcmFtcyA9IGNvbmZpZ1N0b3JhZ2UuZmluZFBhcmFtcyhXcmFwcGVyLCBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWUpXG5cbiAgbGV0IGluaXRpYWxpemVkID0gZmFsc2VcblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBULCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCAmJiBpbml0aWFsaXplckNvbmZpZykge1xuICAgICAgYXdhaXQgaW5pdGlhbGl6ZXIuY2FsbCh3cmFwcGVyKVxuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKGV2ZW50LCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgaGFuZGxlci5hcHBseSh3cmFwcGVyLCBhcmdzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIH1cbiAgfSBhcyBhbnlcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBXIGV4dGVuZHMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PixcbiAgRVxuPiB7XG4gIHByaXZhdGUgY29uZmlnU3RvcmFnZTogQ29uZmlndXJhdGlvblN0b3JhZ2VcbiAgcHJpdmF0ZSBXcmFwcGVyOiBhbnlcbiAgcHJpdmF0ZSB3cmFwcGVyOiBXXG4gIHByaXZhdGUgaW5pdGlhbGl6ZXI6IGFueVxuICBwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihXcmFwcGVyOiBhbnkpIHtcbiAgICB0aGlzLmNvbmZpZ1N0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgdGhpcy5XcmFwcGVyID0gV3JhcHBlclxuICAgIHRoaXMud3JhcHBlciA9IG5ldyBXcmFwcGVyKClcbiAgICBjb25zdCBpbml0aWFsaXplckNvbmZpZyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kSW5pdGlhbGl6ZXIoV3JhcHBlcilcbiAgICB0aGlzLmluaXRpYWxpemVyID1cbiAgICAgIGluaXRpYWxpemVyQ29uZmlnICYmIHRoaXMud3JhcHBlcltpbml0aWFsaXplckNvbmZpZy5tZXRob2ROYW1lXVxuICB9XG5cbiAgYWJzdHJhY3QgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IEUpOiBzdHJpbmdcblxuICBhc3luYyBoYW5kbGVyKGV2ZW50OiBFLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnZXZlbnQ6ICcsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcblxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmluaXRpYWxpemVyKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVyLmNhbGwodGhpcy53cmFwcGVyKVxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVyTmFtZSA9IHRoaXMuZ2V0SGFuZGxlck5hbWUoZXZlbnQpXG5cbiAgICBjb25zdCBoYW5kbGVyQ29uZmlnID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRIYW5kbGVyKFxuICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgaGFuZGxlck5hbWVcbiAgICApXG5cbiAgICBpZiAoIWhhbmRsZXJDb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIGhhbmRsZXIgZm9yIHRoZSAke2hhbmRsZXJOYW1lfSBkZWZpbmVkIG9uIHRoZSBjb250cm9sbGVyYFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLndyYXBwZXJbaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXVxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kUGFyYW1zKFxuICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXG4gICAgKVxuXG4gICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKGV2ZW50LCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgaGFuZGxlci5hcHBseSh0aGlzLndyYXBwZXIsIGFyZ3MpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFRPRE86IHNob3VsZCBiZSBwcm9wZXIgZXJyb3IgaGFuZGxpbmcgbWVjaGFuaXNtIGRlcGVuZGluZyBvbiBzZXJ2aWNlXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRCcmlkZ2VFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEV2ZW50QnJpZGdlRXZlbnQ8c3RyaW5nLCBhbnk+XG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50WydkZXRhaWwtdHlwZSddXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyKFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICByZXR1cm4gY29udHJvbGxlci5oYW5kbGVyLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueSwgYW55PlxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4pIHtcbiAgICByZXR1cm4gZXZlbnQuaW5mbz8uZmllbGROYW1lXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyhXcmFwcGVyKVxuXG4gIHJldHVybiBjb250cm9sbGVyLmhhbmRsZXIuYmluZChjb250cm9sbGVyKSBhcyBhbnlcbn1cbiJdfQ==