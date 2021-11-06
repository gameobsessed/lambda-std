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
        try {
            for (const param of params) {
                args[param.parameterIndex] = await param.resolve(event, context);
            }
        }
        catch (error) {
            // TODO: should be proper error handling mechanism depending on service
            console.error(error);
        }
        this.handlerArgs = args;
    }
    async handler(event, context) {
        console.debug('event: ', JSON.stringify(event, null, 2));
        await this.prepare(event, context);
        return await this._handler.apply(this.wrapper, this.handlerArgs);
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
            try {
                for (const param of params) {
                    args[param.parameterIndex] = await param.resolve(record, context);
                }
                return await handler.apply(this.wrapper, args);
            }
            catch (error) {
                // TODO: should be proper error handling mechanism depending on service
                console.error(error);
            }
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
        if (!this.handlerConfig) {
            console.warn('Handler config not found');
            return;
        }
        const { type } = this.handlerConfig;
        const result = await this._handler.apply(this.wrapper, this.handlerArgs);
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
    return controller.handler.bind(controller);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMEJBSVc7QUFFWCxTQUFnQixVQUFVLENBQUksT0FBWTtJQUN4QyxNQUFNLGFBQWEsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7SUFDL0MsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQTtLQUNuRTtJQUNELE1BQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRSxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO0lBQzdCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDakQsTUFBTSxXQUFXLEdBQ2YsaUJBQWlCLElBQUksT0FBTyxDQUFDLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzdELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUUxRSxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFdkIsT0FBTyxLQUFLLFdBQVcsS0FBUSxFQUFFLE9BQWdCO1FBQy9DLElBQUksQ0FBQyxXQUFXLElBQUksaUJBQWlCLEVBQUU7WUFDckMsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUE7U0FDbkI7UUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7UUFFZixJQUFJO1lBQ0YsS0FBSyxNQUFNLEtB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LEVBQVM7SUFFeEQsT0FBTyxTQUFTLGlCQUFpQixDQUFDLE9BQVk7UUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV0RCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssUUFBUTtnQkFDWCxPQUFPLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBUSxDQUFBO1lBQzFELEtBQUssT0FBTztnQkFDVixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBUSxDQUFBO1NBQ3BEO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWJELDhDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udGV4dCxcbiAgQXBwU3luY1Jlc29sdmVyRXZlbnQsXG4gIEV2ZW50QnJpZGdlRXZlbnQsXG4gIFMzRXZlbnQsXG4gIFMzRXZlbnRSZWNvcmQsXG59IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQge1xuICBDb25maWd1cmF0aW9uU3RvcmFnZSxcbiAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UsXG4gIElIYW5kbGVyQ29uZmlndXJhdGlvbixcbn0gZnJvbSAnLi4nXG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyPFQ+KFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb25maWdTdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICBjb25zdCBoYW5kbGVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSGFuZGxlcihXcmFwcGVyKVxuXG4gIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgIHRocm93IG5ldyBFcnJvcignT25lIGhhbmRsZXIgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXInKVxuICB9XG4gIGNvbnN0IGluaXRpYWxpemVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSW5pdGlhbGl6ZXIoV3JhcHBlcilcblxuICBjb25zdCB3cmFwcGVyID0gbmV3IFdyYXBwZXIoKVxuICBjb25zdCBoYW5kbGVyID0gd3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gIGNvbnN0IGluaXRpYWxpemVyID1cbiAgICBpbml0aWFsaXplckNvbmZpZyAmJiB3cmFwcGVyW2luaXRpYWxpemVyQ29uZmlnPy5tZXRob2ROYW1lXVxuICBjb25zdCBwYXJhbXMgPSBjb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoV3JhcHBlciwgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lKVxuXG4gIGxldCBpbml0aWFsaXplZCA9IGZhbHNlXG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChldmVudDogVCwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGlmICghaW5pdGlhbGl6ZWQgJiYgaW5pdGlhbGl6ZXJDb25maWcpIHtcbiAgICAgIGF3YWl0IGluaXRpYWxpemVyLmNhbGwod3JhcHBlcilcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGFyZ3MgPSBbXVxuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShldmVudCwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIuYXBwbHkod3JhcHBlciwgYXJncylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9XG4gIH0gYXMgYW55XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgVyBleHRlbmRzIFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT4sXG4gIEVcbj4ge1xuICBwcm90ZWN0ZWQgY29uZmlnU3RvcmFnZTogQ29uZmlndXJhdGlvblN0b3JhZ2VcbiAgcHJvdGVjdGVkIFdyYXBwZXI6IGFueVxuICBwcm90ZWN0ZWQgd3JhcHBlcjogV1xuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZXI6IGFueVxuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZVxuICBwcm90ZWN0ZWQgaGFuZGxlckNvbmZpZz86IElIYW5kbGVyQ29uZmlndXJhdGlvblxuICBwcm90ZWN0ZWQgaGFuZGxlckFyZ3M6IGFueVtdXG4gIHByb3RlY3RlZCBfaGFuZGxlcjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcblxuICBjb25zdHJ1Y3RvcihXcmFwcGVyOiBhbnkpIHtcbiAgICB0aGlzLmNvbmZpZ1N0b3JhZ2UgPSBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgdGhpcy5XcmFwcGVyID0gV3JhcHBlclxuICAgIHRoaXMud3JhcHBlciA9IG5ldyBXcmFwcGVyKClcbiAgICBjb25zdCBpbml0aWFsaXplckNvbmZpZyA9IHRoaXMuY29uZmlnU3RvcmFnZS5maW5kSW5pdGlhbGl6ZXIoV3JhcHBlcilcbiAgICB0aGlzLmluaXRpYWxpemVyID1cbiAgICAgIGluaXRpYWxpemVyQ29uZmlnICYmIHRoaXMud3JhcHBlcltpbml0aWFsaXplckNvbmZpZy5tZXRob2ROYW1lXVxuICB9XG5cbiAgYWJzdHJhY3QgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IEUpOiBzdHJpbmdcblxuICBhc3luYyBwcmVwYXJlKGV2ZW50OiBFLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzLndyYXBwZXIpXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gdGhpcy5nZXRIYW5kbGVyTmFtZShldmVudClcblxuICAgIGNvbnN0IGhhbmRsZXJDb25maWcgPSAodGhpcy5oYW5kbGVyQ29uZmlnID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRIYW5kbGVyKFxuICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgaGFuZGxlck5hbWVcbiAgICApKVxuXG4gICAgaWYgKCFoYW5kbGVyQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBoYW5kbGVyIGZvciB0aGUgJHtoYW5kbGVyTmFtZX0gZGVmaW5lZCBvbiB0aGUgY29udHJvbGxlcmBcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy53cmFwcGVyW2hhbmRsZXJDb25maWcubWV0aG9kTmFtZV1cbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZFBhcmFtcyhcbiAgICAgIHRoaXMuV3JhcHBlcixcbiAgICAgIGhhbmRsZXJDb25maWcubWV0aG9kTmFtZVxuICAgIClcblxuICAgIGNvbnNvbGUuZGVidWcoJ3ByZXBhcmUucGFyYW1zJywgSlNPTi5zdHJpbmdpZnkocGFyYW1zLCBudWxsLCAyKSlcblxuICAgIGNvbnN0IGFyZ3MgPSBbXVxuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShldmVudCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogc2hvdWxkIGJlIHByb3BlciBlcnJvciBoYW5kbGluZyBtZWNoYW5pc20gZGVwZW5kaW5nIG9uIHNlcnZpY2VcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVyQXJncyA9IGFyZ3NcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZXIoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuICAgIGF3YWl0IHRoaXMucHJlcGFyZShldmVudCwgY29udGV4dClcblxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9oYW5kbGVyLmFwcGx5KHRoaXMud3JhcHBlciwgdGhpcy5oYW5kbGVyQXJncylcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzczxcbiAgVyBleHRlbmRzIFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT4sXG4gIEUgZXh0ZW5kcyB7IFJlY29yZHM6IFJbXSB9LFxuICBSXG4+IGV4dGVuZHMgRXZlbnRDb250cm9sbGVyQ2xhc3M8VywgRT4ge1xuICBhYnN0cmFjdCBnZXRSZWNvcmRIYW5kbGVyTmFtZShldmVudDogUik6IHN0cmluZ1xuXG4gIGFzeW5jIHJlY29yZHNIYW5kbGVyKGV2ZW50OiBFLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnZXZlbnQ6ICcsIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcblxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmluaXRpYWxpemVyKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVyLmNhbGwodGhpcy53cmFwcGVyKVxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJlY29yZCBvZiBldmVudC5SZWNvcmRzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyTmFtZSA9IHRoaXMuZ2V0UmVjb3JkSGFuZGxlck5hbWUocmVjb3JkKVxuXG4gICAgICBjb25zdCBoYW5kbGVyQ29uZmlnID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRIYW5kbGVyKFxuICAgICAgICB0aGlzLldyYXBwZXIsXG4gICAgICAgIGhhbmRsZXJOYW1lXG4gICAgICApXG5cbiAgICAgIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRoZXJlIGlzIG5vIGhhbmRsZXIgZm9yIHRoZSAke2hhbmRsZXJOYW1lfSBkZWZpbmVkIG9uIHRoZSBjb250cm9sbGVyYFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLndyYXBwZXJbaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXVxuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoXG4gICAgICAgIHRoaXMuV3JhcHBlcixcbiAgICAgICAgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbXVxuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShyZWNvcmQsIGNvbnRleHQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgaGFuZGxlci5hcHBseSh0aGlzLndyYXBwZXIsIGFyZ3MpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBUT0RPOiBzaG91bGQgYmUgcHJvcGVyIGVycm9yIGhhbmRsaW5nIG1lY2hhbmlzbSBkZXBlbmRpbmcgb24gc2VydmljZVxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRCcmlkZ2VFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEV2ZW50QnJpZGdlRXZlbnQ8c3RyaW5nLCBhbnk+XG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50WydkZXRhaWwtdHlwZSddXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyKFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICByZXR1cm4gY29udHJvbGxlci5oYW5kbGVyLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIEV2ZW50Q29udHJvbGxlckNsYXNzPFxuICBhbnksXG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50PGFueSwgYW55PlxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4pIHtcbiAgICByZXR1cm4gZXZlbnQuaW5mbz8uZmllbGROYW1lXG4gIH1cblxuICBhc3luYyBoYW5kbGVyKGV2ZW50OiBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT4sIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuICAgIGF3YWl0IHRoaXMucHJlcGFyZShldmVudCwgY29udGV4dClcblxuICAgIGlmICghdGhpcy5oYW5kbGVyQ29uZmlnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0hhbmRsZXIgY29uZmlnIG5vdCBmb3VuZCcpXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgdHlwZSB9ID0gdGhpcy5oYW5kbGVyQ29uZmlnXG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGVyLmFwcGx5KHRoaXMud3JhcHBlciwgdGhpcy5oYW5kbGVyQXJncylcblxuICAgIHJldHVybiB0eXBlID09PSAnbXV0YXRpb24nXG4gICAgICA/IHtcbiAgICAgICAgICBfX3R5cGVuYW1lOiByZXN1bHQ/LmNvbnN0cnVjdG9yPy5uYW1lLFxuICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgfVxuICAgICAgOiByZXN1bHRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyKFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlckNsYXNzKFdyYXBwZXIpXG5cbiAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxufVxuXG5leHBvcnQgY2xhc3MgUzNFdmVudENvbnRyb2xsZXJDbGFzcyBleHRlbmRzIFJlY29yZHNDb250cm9sbGVyQ2xhc3M8XG4gIGFueSxcbiAgUzNFdmVudCxcbiAgUzNFdmVudFJlY29yZFxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBTM0V2ZW50KSB7XG4gICAgcmV0dXJuICdhbGxSZWNvcmRzJ1xuICB9XG5cbiAgZ2V0UmVjb3JkSGFuZGxlck5hbWUocmVjb3JkOiBTM0V2ZW50UmVjb3JkKSB7XG4gICAgcmV0dXJuIHJlY29yZC5ldmVudE5hbWVcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZWNvcmRzQ29udHJvbGxlclByb3BzIHtcbiAgbW9kZTogJ2V2ZW50JyB8ICdyZWNvcmQnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTM0V2ZW50Q29udHJvbGxlcihcbiAgeyBtb2RlID0gJ3JlY29yZCcgfTogSVJlY29yZHNDb250cm9sbGVyUHJvcHMgPSB7fSBhcyBhbnlcbikge1xuICByZXR1cm4gZnVuY3Rpb24gUzNFdmVudENvbnRyb2xsZXIoV3JhcHBlcjogYW55KSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBTM0V2ZW50Q29udHJvbGxlckNsYXNzKFdyYXBwZXIpXG5cbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ3JlY29yZCc6XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyLnJlY29yZHNIYW5kbGVyLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyLmhhbmRsZXIuYmluZChjb250cm9sbGVyKSBhcyBhbnlcbiAgICB9XG4gIH1cbn1cbiJdfQ==