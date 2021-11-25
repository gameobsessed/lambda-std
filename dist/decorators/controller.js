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
            throw error;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMEJBSVc7QUFFWCxTQUFnQixVQUFVLENBQUksT0FBWTtJQUN4QyxNQUFNLGFBQWEsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7SUFDL0MsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQTtLQUNuRTtJQUNELE1BQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRSxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO0lBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDakQsTUFBTSxXQUFXLEdBQ2YsaUJBQWlCLElBQUksT0FBTyxDQUFDLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzdELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUUxRSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFdkIsT0FBTyxLQUFLLFdBQVcsS0FBUSxFQUFFLE9BQWdCO1FBQy9DLElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLEVBQUU7WUFDckMsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUE7U0FDbkI7UUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7UUFFZixJQUFJO1lBQ0YsS0FBSyxNQUFNLEtB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TyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQVEsQ0FBQTtBQUN2RSxDQUFDO0FBTEQsd0VBS0M7QUFFRCxNQUFhLHNCQUF1QixTQUFRLHNCQUkzQztJQUNDLGNBQWMsQ0FBQyxLQUFjO1FBQzNCLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUFxQjtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBWkQsd0RBWUM7QUFNRCxTQUFnQixpQkFBaUIsQ0FDL0IsRUFBRSxJQUFJLEdBQUcsUUFBUSxLQUE4QixFQUFTO0lBRXhELE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxPQUFZO1FBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFdEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtZQUMxRCxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtTQUNwRDtJQUNILENBQUMsQ0FBQTtBQUNILENBQUM7QUFiRCw4Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRleHQsXG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50LFxuICBFdmVudEJyaWRnZUV2ZW50LFxuICBTM0V2ZW50LFxuICBTM0V2ZW50UmVjb3JkLFxufSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHtcbiAgQ29uZmlndXJhdGlvblN0b3JhZ2UsXG4gIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlLFxuICBJSGFuZGxlckNvbmZpZ3VyYXRpb24sXG59IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcjxUPihXcmFwcGVyOiBhbnkpIHtcbiAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgY29uc3QgaGFuZGxlckNvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UuZmluZEhhbmRsZXIoV3JhcHBlcilcblxuICBpZiAoIWhhbmRsZXJDb25maWcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09uZSBoYW5kbGVyIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjb250cm9sbGVyJylcbiAgfVxuICBjb25zdCBpbml0aWFsaXplckNvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UuZmluZEluaXRpYWxpemVyKFdyYXBwZXIpXG5cbiAgY29uc3Qgd3JhcHBlciA9IG5ldyBXcmFwcGVyKClcbiAgY29uc3QgaGFuZGxlciA9IHdyYXBwZXJbaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXVxuICBjb25zdCBpbml0aWFsaXplciA9XG4gICAgaW5pdGlhbGl6ZXJDb25maWcgJiYgd3JhcHBlcltpbml0aWFsaXplckNvbmZpZz8ubWV0aG9kTmFtZV1cbiAgY29uc3QgcGFyYW1zID0gY29uZmlnU3RvcmFnZS5maW5kUGFyYW1zKFdyYXBwZXIsIGhhbmRsZXJDb25maWcubWV0aG9kTmFtZSlcblxuICBsZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAoZXZlbnQ6IFQsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBpZiAoIWluaXRpYWxpemVkICYmIGluaXRpYWxpemVyQ29uZmlnKSB7XG4gICAgICBhd2FpdCBpbml0aWFsaXplci5jYWxsKHdyYXBwZXIpXG4gICAgICBpbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBhcmdzID0gW11cblxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgICAgICBhcmdzW3BhcmFtLnBhcmFtZXRlckluZGV4XSA9IGF3YWl0IHBhcmFtLnJlc29sdmUoZXZlbnQsIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhd2FpdCBoYW5kbGVyLmFwcGx5KHdyYXBwZXIsIGFyZ3MpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfVxuICB9IGFzIGFueVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXZlbnRDb250cm9sbGVyQ2xhc3M8XG4gIFcgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+LFxuICBFXG4+IHtcbiAgcHJvdGVjdGVkIGNvbmZpZ1N0b3JhZ2U6IENvbmZpZ3VyYXRpb25TdG9yYWdlXG4gIHByb3RlY3RlZCBXcmFwcGVyOiBhbnlcbiAgcHJvdGVjdGVkIHdyYXBwZXI6IFdcbiAgcHJvdGVjdGVkIGluaXRpYWxpemVyOiBhbnlcbiAgcHJvdGVjdGVkIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2VcbiAgcHJvdGVjdGVkIGhhbmRsZXJDb25maWc/OiBJSGFuZGxlckNvbmZpZ3VyYXRpb25cbiAgcHJvdGVjdGVkIGhhbmRsZXJBcmdzOiBhbnlbXVxuICBwcm90ZWN0ZWQgX2hhbmRsZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55XG5cbiAgY29uc3RydWN0b3IoV3JhcHBlcjogYW55KSB7XG4gICAgdGhpcy5jb25maWdTdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIHRoaXMuV3JhcHBlciA9IFdyYXBwZXJcbiAgICB0aGlzLndyYXBwZXIgPSBuZXcgV3JhcHBlcigpXG4gICAgY29uc3QgaW5pdGlhbGl6ZXJDb25maWcgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZEluaXRpYWxpemVyKFdyYXBwZXIpXG4gICAgdGhpcy5pbml0aWFsaXplciA9XG4gICAgICBpbml0aWFsaXplckNvbmZpZyAmJiB0aGlzLndyYXBwZXJbaW5pdGlhbGl6ZXJDb25maWcubWV0aG9kTmFtZV1cbiAgfVxuXG4gIGFic3RyYWN0IGdldEhhbmRsZXJOYW1lKGV2ZW50OiBFKTogc3RyaW5nXG5cbiAgYXN5bmMgcHJlcGFyZShldmVudDogRSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmluaXRpYWxpemVyKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVyLmNhbGwodGhpcy53cmFwcGVyKVxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVyTmFtZSA9IHRoaXMuZ2V0SGFuZGxlck5hbWUoZXZlbnQpXG5cbiAgICBjb25zdCBoYW5kbGVyQ29uZmlnID0gKHRoaXMuaGFuZGxlckNvbmZpZyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kSGFuZGxlcihcbiAgICAgIHRoaXMuV3JhcHBlcixcbiAgICAgIGhhbmRsZXJOYW1lXG4gICAgKSlcblxuICAgIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gaGFuZGxlciBmb3IgdGhlICR7aGFuZGxlck5hbWV9IGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXJgXG4gICAgICApXG4gICAgfVxuXG4gICAgdGhpcy5faGFuZGxlciA9IHRoaXMud3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoXG4gICAgICB0aGlzLldyYXBwZXIsXG4gICAgICBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVcbiAgICApXG5cbiAgICBjb25zb2xlLmRlYnVnKCdwcmVwYXJlLnBhcmFtcycsIEpTT04uc3RyaW5naWZ5KHBhcmFtcywgbnVsbCwgMikpXG5cbiAgICBjb25zdCBhcmdzID0gW11cblxuICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICBhcmdzW3BhcmFtLnBhcmFtZXRlckluZGV4XSA9IGF3YWl0IHBhcmFtLnJlc29sdmUoZXZlbnQsIGNvbnRleHQpXG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVyQXJncyA9IGFyZ3NcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZXIoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuICAgIGxldCByZXN1bHRcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnByZXBhcmUoZXZlbnQsIGNvbnRleHQpXG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGVyLmFwcGx5KHRoaXMud3JhcHBlciwgdGhpcy5oYW5kbGVyQXJncylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlY29yZHNDb250cm9sbGVyQ2xhc3M8XG4gIFcgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+LFxuICBFIGV4dGVuZHMgeyBSZWNvcmRzOiBSW10gfSxcbiAgUlxuPiBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFcsIEU+IHtcbiAgYWJzdHJhY3QgZ2V0UmVjb3JkSGFuZGxlck5hbWUoZXZlbnQ6IFIpOiBzdHJpbmdcblxuICBhc3luYyByZWNvcmRzSGFuZGxlcihldmVudDogRSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ2V2ZW50OiAnLCBKU09OLnN0cmluZ2lmeShldmVudCwgbnVsbCwgMikpXG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5pbml0aWFsaXplcikge1xuICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplci5jYWxsKHRoaXMud3JhcHBlcilcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByZWNvcmQgb2YgZXZlbnQuUmVjb3Jkcykge1xuICAgICAgY29uc3QgaGFuZGxlck5hbWUgPSB0aGlzLmdldFJlY29yZEhhbmRsZXJOYW1lKHJlY29yZClcblxuICAgICAgY29uc3QgaGFuZGxlckNvbmZpZyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kSGFuZGxlcihcbiAgICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgICBoYW5kbGVyTmFtZVxuICAgICAgKVxuXG4gICAgICBpZiAoIWhhbmRsZXJDb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBUaGVyZSBpcyBubyBoYW5kbGVyIGZvciB0aGUgJHtoYW5kbGVyTmFtZX0gZGVmaW5lZCBvbiB0aGUgY29udHJvbGxlcmBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy53cmFwcGVyW2hhbmRsZXJDb25maWcubWV0aG9kTmFtZV1cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kUGFyYW1zKFxuICAgICAgICB0aGlzLldyYXBwZXIsXG4gICAgICAgIGhhbmRsZXJDb25maWcubWV0aG9kTmFtZVxuICAgICAgKVxuXG4gICAgICBjb25zdCBhcmdzID0gW11cblxuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKHJlY29yZCwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIuYXBwbHkodGhpcy53cmFwcGVyLCBhcmdzKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRCcmlkZ2VFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEV2ZW50QnJpZGdlRXZlbnQ8c3RyaW5nLCBhbnk+XG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50WydkZXRhaWwtdHlwZSddXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyKFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICByZXR1cm4gY29udHJvbGxlci5oYW5kbGVyLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueSwgYW55PlxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4pIHtcbiAgICByZXR1cm4gZXZlbnQuaW5mbz8uZmllbGROYW1lXG4gIH1cblxuICBhc3luYyBoYW5kbGVyKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4sIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuXG4gICAgYXdhaXQgdGhpcy5wcmVwYXJlKGV2ZW50LCBjb250ZXh0KVxuXG4gICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICdwcmVwYXJlZDogJyxcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICB7IGhhbmRsZXI6IHRoaXMuX2hhbmRsZXIsIGFyZ3M6IHRoaXMuaGFuZGxlckFyZ3MgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIClcblxuICAgIGlmICghdGhpcy5oYW5kbGVyQ29uZmlnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0hhbmRsZXIgY29uZmlnIG5vdCBmb3VuZCcpXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgdHlwZSB9ID0gdGhpcy5oYW5kbGVyQ29uZmlnXG5cbiAgICBsZXQgcmVzdWx0XG5cbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlci5hcHBseSh0aGlzLndyYXBwZXIsIHRoaXMuaGFuZGxlckFyZ3MpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdtdXRhdGlvbidcbiAgICAgID8ge1xuICAgICAgICAgIF9fdHlwZW5hbWU6IHJlc3VsdD8uY29uc3RydWN0b3I/Lm5hbWUsXG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICB9XG4gICAgICA6IHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXIoV3JhcHBlcjogYW55KSB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcbiAgY29uc3QgaGFuZGxlciA9IGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpXG5cbiAgcmV0dXJuIChhc3luYyAoLi4uYXJnczogW2FueSwgYW55XSkgPT4gYXdhaXQgaGFuZGxlciguLi5hcmdzKSkgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBTM0V2ZW50Q29udHJvbGxlckNsYXNzIGV4dGVuZHMgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBTM0V2ZW50LFxuICBTM0V2ZW50UmVjb3JkXG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IFMzRXZlbnQpIHtcbiAgICByZXR1cm4gJ2FsbFJlY29yZHMnXG4gIH1cblxuICBnZXRSZWNvcmRIYW5kbGVyTmFtZShyZWNvcmQ6IFMzRXZlbnRSZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkLmV2ZW50TmFtZVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY29yZHNDb250cm9sbGVyUHJvcHMge1xuICBtb2RlOiAnZXZlbnQnIHwgJ3JlY29yZCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFMzRXZlbnRDb250cm9sbGVyKFxuICB7IG1vZGUgPSAncmVjb3JkJyB9OiBJUmVjb3Jkc0NvbnRyb2xsZXJQcm9wcyA9IHt9IGFzIGFueVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBTM0V2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IFMzRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAncmVjb3JkJzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIucmVjb3Jkc0hhbmRsZXIuYmluZChjb250cm9sbGVyKSBhcyBhbnlcbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxuICAgIH1cbiAgfVxufVxuIl19