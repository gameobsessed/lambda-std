"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3EventController = exports.S3EventControllerClass = exports.AppSyncResolverEventController = exports.AppSyncResolverEventControllerClass = exports.EventBridgeEventController = exports.EventBridgeEventControllerClass = exports.RecordsControllerClass = exports.EventControllerClass = exports.Controller = void 0;
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
    async prepare(event, context) {
        if (!this.initialized && this.initializer) {
            await this.initializer.call(this.wrapper);
            this.initialized = true;
        }
        const handlerName = this.getHandlerName(event);
        const handlerConfig = (this.handlerConfig = this.configStorage.findHandler(this.Wrapper, handlerName));
        if (!handlerConfig) {
            throw new Error(`There is no handler for the ${handlerName} defined on the controller`);
        }
        this._handler = this.wrapper[handlerConfig.methodName];
        const params = this.configStorage.findParams(this.Wrapper, handlerConfig.methodName);
        console.debug('prepare.params', JSON.stringify(params, null, 2));
        const args = [];
        for (const param of params) {
            args[param.parameterIndex] = await param.resolve(event, context);
        }
        this.handlerArgs = args;
    }
    async handler(event, context) {
        console.debug('event: ', JSON.stringify(event, null, 2));
        let result;
        try {
            await this.prepare(event, context);
            result = await this._handler.apply(this.wrapper, this.handlerArgs);
        }
        catch (error) {
            console.error(error);
        }
        return result;
    }
}
exports.EventControllerClass = EventControllerClass;
class RecordsControllerClass extends EventControllerClass {
    async recordsHandler(event, context) {
        console.debug('event: ', JSON.stringify(event, null, 2));
        if (!this.initialized && this.initializer) {
            await this.initializer.call(this.wrapper);
            this.initialized = true;
        }
        for (const record of event.Records) {
            const handlerName = this.getRecordHandlerName(record);
            const handlerConfig = this.configStorage.findHandler(this.Wrapper, handlerName);
            if (!handlerConfig) {
                throw new Error(`There is no handler for the ${handlerName} defined on the controller`);
            }
            const handler = this.wrapper[handlerConfig.methodName];
            const params = this.configStorage.findParams(this.Wrapper, handlerConfig.methodName);
            const args = [];
            for (const param of params) {
                args[param.parameterIndex] = await param.resolve(record, context);
            }
            return await handler.apply(this.wrapper, args);
        }
    }
}
exports.RecordsControllerClass = RecordsControllerClass;
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
    async handler(event, context) {
        var _a;
        console.debug('event: ', JSON.stringify(event, null, 2));
        await this.prepare(event, context);
        console.debug('prepared: ', JSON.stringify({ handler: this._handler, args: this.handlerArgs }, null, 2));
        if (!this.handlerConfig) {
            console.warn('Handler config not found');
            return;
        }
        const { type } = this.handlerConfig;
        let result;
        try {
            result = await this._handler.apply(this.wrapper, this.handlerArgs);
        }
        catch (error) {
            console.error('ERROR: ', error);
        }
        return type === 'mutation'
            ? {
                __typename: (_a = result === null || result === void 0 ? void 0 : result.constructor) === null || _a === void 0 ? void 0 : _a.name,
                ...result,
            }
            : result;
    }
}
exports.AppSyncResolverEventControllerClass = AppSyncResolverEventControllerClass;
function AppSyncResolverEventController(Wrapper) {
    const controller = new AppSyncResolverEventControllerClass(Wrapper);
    const handler = controller.handler.bind(controller);
    return (async (...args) => await handler(...args));
}
exports.AppSyncResolverEventController = AppSyncResolverEventController;
class S3EventControllerClass extends RecordsControllerClass {
    getHandlerName(event) {
        return 'allRecords';
    }
    getRecordHandlerName(record) {
        return record.eventName;
    }
}
exports.S3EventControllerClass = S3EventControllerClass;
function S3EventController({ mode = 'record' } = {}) {
    return function S3EventController(Wrapper) {
        const controller = new S3EventControllerClass(Wrapper);
        switch (mode) {
            case 'record':
                return controller.recordsHandler.bind(controller);
            case 'event':
                return controller.handler.bind(controller);
        }
    };
}
exports.S3EventController = S3EventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMEJBSVc7QUFFWCxTQUFnQixVQUFVLENBQUksT0FBWTtJQUN4QyxNQUFNLGFBQWEsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7SUFDL0MsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQTtLQUNuRTtJQUNELE1BQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRSxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO0lBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDakQsTUFBTSxXQUFXLEdBQ2YsaUJBQWlCLElBQUksT0FBTyxDQUFDLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzdELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUUxRSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFdkIsT0FBTyxLQUFLLFdBQVcsS0FBUSxFQUFFLE9BQWdCO1FBQy9DLElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLEVBQUU7WUFDckMsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUE7U0FDbkI7UUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7UUFFZixJQUFJO1lBQ0YsS0FBSyxNQUFNLEtB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RyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFRLENBQUE7QUFDdkUsQ0FBQztBQUxELHdFQUtDO0FBRUQsTUFBYSxzQkFBdUIsU0FBUSxzQkFJM0M7SUFDQyxjQUFjLENBQUMsS0FBYztRQUMzQixPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsTUFBcUI7UUFDeEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFBO0lBQ3pCLENBQUM7Q0FDRjtBQVpELHdEQVlDO0FBTUQsU0FBZ0IsaUJBQWlCLENBQy9CLEVBQUUsSUFBSSxHQUFHLFFBQVEsS0FBOEIsRUFBUztJQUV4RCxPQUFPLFNBQVMsaUJBQWlCLENBQUMsT0FBWTtRQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXRELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxRQUFRO2dCQUNYLE9BQU8sVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUE7WUFDMUQsS0FBSyxPQUFPO2dCQUNWLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUE7U0FDcEQ7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBYkQsOENBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb250ZXh0LFxuICBBcHBTeW5jUmVzb2x2ZXJFdmVudCxcbiAgRXZlbnRCcmlkZ2VFdmVudCxcbiAgUzNFdmVudCxcbiAgUzNFdmVudFJlY29yZCxcbn0gZnJvbSAnYXdzLWxhbWJkYSdcbmltcG9ydCB7XG4gIENvbmZpZ3VyYXRpb25TdG9yYWdlLFxuICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSxcbiAgSUhhbmRsZXJDb25maWd1cmF0aW9uLFxufSBmcm9tICcuLidcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xsZXI8VD4oV3JhcHBlcjogYW55KSB7XG4gIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gIGNvbnN0IGhhbmRsZXJDb25maWcgPSBjb25maWdTdG9yYWdlLmZpbmRIYW5kbGVyKFdyYXBwZXIpXG5cbiAgaWYgKCFoYW5kbGVyQ29uZmlnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmUgaGFuZGxlciBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY29udHJvbGxlcicpXG4gIH1cbiAgY29uc3QgaW5pdGlhbGl6ZXJDb25maWcgPSBjb25maWdTdG9yYWdlLmZpbmRJbml0aWFsaXplcihXcmFwcGVyKVxuXG4gIGNvbnN0IHdyYXBwZXIgPSBuZXcgV3JhcHBlcigpXG4gIGNvbnN0IGhhbmRsZXIgPSB3cmFwcGVyW2hhbmRsZXJDb25maWcubWV0aG9kTmFtZV1cbiAgY29uc3QgaW5pdGlhbGl6ZXIgPVxuICAgIGluaXRpYWxpemVyQ29uZmlnICYmIHdyYXBwZXJbaW5pdGlhbGl6ZXJDb25maWc/Lm1ldGhvZE5hbWVdXG4gIGNvbnN0IHBhcmFtcyA9IGNvbmZpZ1N0b3JhZ2UuZmluZFBhcmFtcyhXcmFwcGVyLCBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWUpXG5cbiAgbGV0IGluaXRpYWxpemVkID0gZmFsc2VcblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBULCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCAmJiBpbml0aWFsaXplckNvbmZpZykge1xuICAgICAgYXdhaXQgaW5pdGlhbGl6ZXIuY2FsbCh3cmFwcGVyKVxuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKGV2ZW50LCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgaGFuZGxlci5hcHBseSh3cmFwcGVyLCBhcmdzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIH1cbiAgfSBhcyBhbnlcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBXIGV4dGVuZHMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PixcbiAgRVxuPiB7XG4gIHByb3RlY3RlZCBjb25maWdTdG9yYWdlOiBDb25maWd1cmF0aW9uU3RvcmFnZVxuICBwcm90ZWN0ZWQgV3JhcHBlcjogYW55XG4gIHByb3RlY3RlZCB3cmFwcGVyOiBXXG4gIHByb3RlY3RlZCBpbml0aWFsaXplcjogYW55XG4gIHByb3RlY3RlZCBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlXG4gIHByb3RlY3RlZCBoYW5kbGVyQ29uZmlnPzogSUhhbmRsZXJDb25maWd1cmF0aW9uXG4gIHByb3RlY3RlZCBoYW5kbGVyQXJnczogYW55W11cbiAgcHJvdGVjdGVkIF9oYW5kbGVyOiAoLi4uYXJnczogYW55W10pID0+IGFueVxuXG4gIGNvbnN0cnVjdG9yKFdyYXBwZXI6IGFueSkge1xuICAgIHRoaXMuY29uZmlnU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICB0aGlzLldyYXBwZXIgPSBXcmFwcGVyXG4gICAgdGhpcy53cmFwcGVyID0gbmV3IFdyYXBwZXIoKVxuICAgIGNvbnN0IGluaXRpYWxpemVyQ29uZmlnID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRJbml0aWFsaXplcihXcmFwcGVyKVxuICAgIHRoaXMuaW5pdGlhbGl6ZXIgPVxuICAgICAgaW5pdGlhbGl6ZXJDb25maWcgJiYgdGhpcy53cmFwcGVyW2luaXRpYWxpemVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gIH1cblxuICBhYnN0cmFjdCBnZXRIYW5kbGVyTmFtZShldmVudDogRSk6IHN0cmluZ1xuXG4gIGFzeW5jIHByZXBhcmUoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5pbml0aWFsaXplcikge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplci5jYWxsKHRoaXMud3JhcHBlcilcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlck5hbWUgPSB0aGlzLmdldEhhbmRsZXJOYW1lKGV2ZW50KVxuXG4gICAgY29uc3QgaGFuZGxlckNvbmZpZyA9ICh0aGlzLmhhbmRsZXJDb25maWcgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZEhhbmRsZXIoXG4gICAgICB0aGlzLldyYXBwZXIsXG4gICAgICBoYW5kbGVyTmFtZVxuICAgICkpXG5cbiAgICBpZiAoIWhhbmRsZXJDb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIGhhbmRsZXIgZm9yIHRoZSAke2hhbmRsZXJOYW1lfSBkZWZpbmVkIG9uIHRoZSBjb250cm9sbGVyYFxuICAgICAgKVxuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZXIgPSB0aGlzLndyYXBwZXJbaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXVxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kUGFyYW1zKFxuICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXG4gICAgKVxuXG4gICAgY29uc29sZS5kZWJ1ZygncHJlcGFyZS5wYXJhbXMnLCBKU09OLnN0cmluZ2lmeShwYXJhbXMsIG51bGwsIDIpKVxuXG4gICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKGV2ZW50LCBjb250ZXh0KVxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlckFyZ3MgPSBhcmdzXG4gIH1cblxuICBhc3luYyBoYW5kbGVyKGV2ZW50OiBFLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnZXZlbnQ6ICcsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcbiAgICBsZXQgcmVzdWx0XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5wcmVwYXJlKGV2ZW50LCBjb250ZXh0KVxuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlci5hcHBseSh0aGlzLndyYXBwZXIsIHRoaXMuaGFuZGxlckFyZ3MpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWNvcmRzQ29udHJvbGxlckNsYXNzPFxuICBXIGV4dGVuZHMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PixcbiAgRSBleHRlbmRzIHsgUmVjb3JkczogUltdIH0sXG4gIFJcbj4gZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxXLCBFPiB7XG4gIGFic3RyYWN0IGdldFJlY29yZEhhbmRsZXJOYW1lKGV2ZW50OiBSKTogc3RyaW5nXG5cbiAgYXN5bmMgcmVjb3Jkc0hhbmRsZXIoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzLndyYXBwZXIpXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmVjb3JkIG9mIGV2ZW50LlJlY29yZHMpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gdGhpcy5nZXRSZWNvcmRIYW5kbGVyTmFtZShyZWNvcmQpXG5cbiAgICAgIGNvbnN0IGhhbmRsZXJDb25maWcgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZEhhbmRsZXIoXG4gICAgICAgIHRoaXMuV3JhcHBlcixcbiAgICAgICAgaGFuZGxlck5hbWVcbiAgICAgIClcblxuICAgICAgaWYgKCFoYW5kbGVyQ29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVGhlcmUgaXMgbm8gaGFuZGxlciBmb3IgdGhlICR7aGFuZGxlck5hbWV9IGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXJgXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMud3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZFBhcmFtcyhcbiAgICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgICBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVcbiAgICAgIClcblxuICAgICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShyZWNvcmQsIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhd2FpdCBoYW5kbGVyLmFwcGx5KHRoaXMud3JhcHBlciwgYXJncylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyQ2xhc3MgZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBFdmVudEJyaWRnZUV2ZW50PHN0cmluZywgYW55PlxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgIHJldHVybiBldmVudFsnZGV0YWlsLXR5cGUnXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudEJyaWRnZUV2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBFdmVudEJyaWRnZUV2ZW50Q29udHJvbGxlckNsYXNzKFdyYXBwZXIpXG5cbiAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxufVxuXG5leHBvcnQgY2xhc3MgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MgZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT5cbj4ge1xuICBnZXRIYW5kbGVyTmFtZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50LmluZm8/LmZpZWxkTmFtZVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlcihldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55LCBhbnk+LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnZXZlbnQ6ICcsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcblxuICAgIGF3YWl0IHRoaXMucHJlcGFyZShldmVudCwgY29udGV4dClcblxuICAgIGNvbnNvbGUuZGVidWcoXG4gICAgICAncHJlcGFyZWQ6ICcsXG4gICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgeyBoYW5kbGVyOiB0aGlzLl9oYW5kbGVyLCBhcmdzOiB0aGlzLmhhbmRsZXJBcmdzIH0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIDJcbiAgICAgIClcbiAgICApXG5cbiAgICBpZiAoIXRoaXMuaGFuZGxlckNvbmZpZykge1xuICAgICAgY29uc29sZS53YXJuKCdIYW5kbGVyIGNvbmZpZyBub3QgZm91bmQnKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IHR5cGUgfSA9IHRoaXMuaGFuZGxlckNvbmZpZ1xuXG4gICAgbGV0IHJlc3VsdFxuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZXIuYXBwbHkodGhpcy53cmFwcGVyLCB0aGlzLmhhbmRsZXJBcmdzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogJywgZXJyb3IpXG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdtdXRhdGlvbidcbiAgICAgID8ge1xuICAgICAgICAgIF9fdHlwZW5hbWU6IHJlc3VsdD8uY29uc3RydWN0b3I/Lm5hbWUsXG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICB9XG4gICAgICA6IHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXIoV3JhcHBlcjogYW55KSB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcbiAgY29uc3QgaGFuZGxlciA9IGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpXG5cbiAgcmV0dXJuIChhc3luYyAoLi4uYXJnczogW2FueSwgYW55XSkgPT4gYXdhaXQgaGFuZGxlciguLi5hcmdzKSkgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBTM0V2ZW50Q29udHJvbGxlckNsYXNzIGV4dGVuZHMgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBTM0V2ZW50LFxuICBTM0V2ZW50UmVjb3JkXG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IFMzRXZlbnQpIHtcbiAgICByZXR1cm4gJ2FsbFJlY29yZHMnXG4gIH1cblxuICBnZXRSZWNvcmRIYW5kbGVyTmFtZShyZWNvcmQ6IFMzRXZlbnRSZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkLmV2ZW50TmFtZVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY29yZHNDb250cm9sbGVyUHJvcHMge1xuICBtb2RlOiAnZXZlbnQnIHwgJ3JlY29yZCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFMzRXZlbnRDb250cm9sbGVyKFxuICB7IG1vZGUgPSAncmVjb3JkJyB9OiBJUmVjb3Jkc0NvbnRyb2xsZXJQcm9wcyA9IHt9IGFzIGFueVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBTM0V2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IFMzRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAncmVjb3JkJzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIucmVjb3Jkc0hhbmRsZXIuYmluZChjb250cm9sbGVyKSBhcyBhbnlcbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxuICAgIH1cbiAgfVxufVxuIl19