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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMEJBQWtFO0FBRWxFLFNBQWdCLFVBQVUsQ0FBSSxPQUFZO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO0tBQ25FO0lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhFLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNqRCxNQUFNLFdBQVcsR0FDZixpQkFBaUIsSUFBSSxPQUFPLENBQUMsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsVUFBVSxDQUFDLENBQUE7SUFDN0QsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRTFFLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUV2QixPQUFPLEtBQUssV0FBVyxLQUFRLEVBQUUsT0FBZ0I7UUFDL0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQTtTQUNuQjtRQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUVmLElBQUk7WUFDRixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ2pFO1lBRUQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQzFDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3JCO0lBQ0gsQ0FBUSxDQUFBO0FBQ1YsQ0FBQztBQW5DRCxnQ0FtQ0M7QUFFRCxNQUFzQixvQkFBb0I7SUFVeEMsWUFBWSxPQUFZO1FBRmQsZ0JBQVcsR0FBWSxLQUFLLENBQUE7UUFHcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFBLDJCQUF1QixHQUFFLENBQUE7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzVCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFdBQVc7WUFDZCxpQkFBaUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFJRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQVEsRUFBRSxPQUFnQjtRQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUV4RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1NBQ3hCO1FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUU5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FDbEQsSUFBSSxDQUFDLE9BQU8sRUFDWixXQUFXLENBQ1osQ0FBQTtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDYiwrQkFBK0IsV0FBVyw0QkFBNEIsQ0FDdkUsQ0FBQTtTQUNGO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQzFDLElBQUksQ0FBQyxPQUFPLEVBQ1osYUFBYSxDQUFDLFVBQVUsQ0FDekIsQ0FBQTtRQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUVmLElBQUk7WUFDRixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ2pFO1lBRUQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUMvQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsdUVBQXVFO1lBQ3ZFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDckI7SUFDSCxDQUFDO0NBQ0Y7QUE3REQsb0RBNkRDO0FBRUQsTUFBc0Isc0JBSXBCLFNBQVEsb0JBQTBCO0lBR2xDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBUSxFQUFFLE9BQWdCO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDekMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7U0FDeEI7UUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXJELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUNsRCxJQUFJLENBQUMsT0FBTyxFQUNaLFdBQVcsQ0FDWixDQUFBO1lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDYiwrQkFBK0IsV0FBVyw0QkFBNEIsQ0FDdkUsQ0FBQTthQUNGO1lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQzFDLElBQUksQ0FBQyxPQUFPLEVBQ1osYUFBYSxDQUFDLFVBQVUsQ0FDekIsQ0FBQTtZQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQTtZQUVmLElBQUk7Z0JBQ0YsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtpQkFDakU7Z0JBRUQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTthQUMvQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHVFQUF1RTtnQkFDdkUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNyQjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBakRELHdEQWlEQztBQUVELE1BQWEsK0JBQWdDLFNBQVEsb0JBR3BEO0lBQ0MsY0FBYyxDQUFDLEtBQWlDO1FBQzlDLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRjtBQVBELDBFQU9DO0FBRUQsU0FBZ0IsMEJBQTBCLENBQUMsT0FBWTtJQUNyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRS9ELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUE7QUFDbkQsQ0FBQztBQUpELGdFQUlDO0FBRUQsTUFBYSxtQ0FBb0MsU0FBUSxvQkFHeEQ7SUFDQyxjQUFjLENBQUMsS0FBcUM7O1FBQ2xELE9BQU8sTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUE7SUFDOUIsQ0FBQztDQUNGO0FBUEQsa0ZBT0M7QUFFRCxTQUFnQiw4QkFBOEIsQ0FBQyxPQUFZO0lBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksbUNBQW1DLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFbkUsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtBQUNuRCxDQUFDO0FBSkQsd0VBSUM7QUFFRCxNQUFhLHNCQUF1QixTQUFRLHNCQUkzQztJQUNDLGNBQWMsQ0FBQyxLQUFjO1FBQzNCLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUFxQjtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBWkQsd0RBWUM7QUFNRCxTQUFnQixpQkFBaUIsQ0FDL0IsRUFBRSxJQUFJLEdBQUcsUUFBUSxLQUE4QixFQUFTO0lBRXhELE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxPQUFZO1FBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFdEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtZQUMxRCxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtTQUNwRDtJQUNILENBQUMsQ0FBQTtBQUNILENBQUM7QUFiRCw4Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRleHQsXG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50LFxuICBFdmVudEJyaWRnZUV2ZW50LFxuICBTM0V2ZW50LFxuICBTM0V2ZW50UmVjb3JkLFxufSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblN0b3JhZ2UsIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyPFQ+KFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb25maWdTdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICBjb25zdCBoYW5kbGVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSGFuZGxlcihXcmFwcGVyKVxuXG4gIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgIHRocm93IG5ldyBFcnJvcignT25lIGhhbmRsZXIgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXInKVxuICB9XG4gIGNvbnN0IGluaXRpYWxpemVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSW5pdGlhbGl6ZXIoV3JhcHBlcilcblxuICBjb25zdCB3cmFwcGVyID0gbmV3IFdyYXBwZXIoKVxuICBjb25zdCBoYW5kbGVyID0gd3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gIGNvbnN0IGluaXRpYWxpemVyID1cbiAgICBpbml0aWFsaXplckNvbmZpZyAmJiB3cmFwcGVyW2luaXRpYWxpemVyQ29uZmlnPy5tZXRob2ROYW1lXVxuICBjb25zdCBwYXJhbXMgPSBjb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoV3JhcHBlciwgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lKVxuXG4gIGxldCBpbml0aWFsaXplZCA9IGZhbHNlXG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChldmVudDogVCwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGlmICghaW5pdGlhbGl6ZWQgJiYgaW5pdGlhbGl6ZXJDb25maWcpIHtcbiAgICAgIGF3YWl0IGluaXRpYWxpemVyLmNhbGwod3JhcHBlcilcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGFyZ3MgPSBbXVxuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShldmVudCwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIuYXBwbHkod3JhcHBlciwgYXJncylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9XG4gIH0gYXMgYW55XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgVyBleHRlbmRzIFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT4sXG4gIEVcbj4ge1xuICBwcm90ZWN0ZWQgY29uZmlnU3RvcmFnZTogQ29uZmlndXJhdGlvblN0b3JhZ2VcbiAgcHJvdGVjdGVkIFdyYXBwZXI6IGFueVxuICBwcm90ZWN0ZWQgd3JhcHBlcjogV1xuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZXI6IGFueVxuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKFdyYXBwZXI6IGFueSkge1xuICAgIHRoaXMuY29uZmlnU3RvcmFnZSA9IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKClcbiAgICB0aGlzLldyYXBwZXIgPSBXcmFwcGVyXG4gICAgdGhpcy53cmFwcGVyID0gbmV3IFdyYXBwZXIoKVxuICAgIGNvbnN0IGluaXRpYWxpemVyQ29uZmlnID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRJbml0aWFsaXplcihXcmFwcGVyKVxuICAgIHRoaXMuaW5pdGlhbGl6ZXIgPVxuICAgICAgaW5pdGlhbGl6ZXJDb25maWcgJiYgdGhpcy53cmFwcGVyW2luaXRpYWxpemVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gIH1cblxuICBhYnN0cmFjdCBnZXRIYW5kbGVyTmFtZShldmVudDogRSk6IHN0cmluZ1xuXG4gIGFzeW5jIGhhbmRsZXIoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzLndyYXBwZXIpXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gdGhpcy5nZXRIYW5kbGVyTmFtZShldmVudClcblxuICAgIGNvbnN0IGhhbmRsZXJDb25maWcgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZEhhbmRsZXIoXG4gICAgICB0aGlzLldyYXBwZXIsXG4gICAgICBoYW5kbGVyTmFtZVxuICAgIClcblxuICAgIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gaGFuZGxlciBmb3IgdGhlICR7aGFuZGxlck5hbWV9IGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXJgXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMud3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoXG4gICAgICB0aGlzLldyYXBwZXIsXG4gICAgICBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVcbiAgICApXG5cbiAgICBjb25zdCBhcmdzID0gW11cblxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgICAgICBhcmdzW3BhcmFtLnBhcmFtZXRlckluZGV4XSA9IGF3YWl0IHBhcmFtLnJlc29sdmUoZXZlbnQsIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhd2FpdCBoYW5kbGVyLmFwcGx5KHRoaXMud3JhcHBlciwgYXJncylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogc2hvdWxkIGJlIHByb3BlciBlcnJvciBoYW5kbGluZyBtZWNoYW5pc20gZGVwZW5kaW5nIG9uIHNlcnZpY2VcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWNvcmRzQ29udHJvbGxlckNsYXNzPFxuICBXIGV4dGVuZHMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PixcbiAgRSBleHRlbmRzIHsgUmVjb3JkczogUltdIH0sXG4gIFJcbj4gZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxXLCBFPiB7XG4gIGFic3RyYWN0IGdldFJlY29yZEhhbmRsZXJOYW1lKGV2ZW50OiBSKTogc3RyaW5nXG5cbiAgYXN5bmMgcmVjb3Jkc0hhbmRsZXIoZXZlbnQ6IEUsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdldmVudDogJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuaW5pdGlhbGl6ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzLndyYXBwZXIpXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmVjb3JkIG9mIGV2ZW50LlJlY29yZHMpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gdGhpcy5nZXRSZWNvcmRIYW5kbGVyTmFtZShyZWNvcmQpXG5cbiAgICAgIGNvbnN0IGhhbmRsZXJDb25maWcgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZEhhbmRsZXIoXG4gICAgICAgIHRoaXMuV3JhcHBlcixcbiAgICAgICAgaGFuZGxlck5hbWVcbiAgICAgIClcblxuICAgICAgaWYgKCFoYW5kbGVyQ29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVGhlcmUgaXMgbm8gaGFuZGxlciBmb3IgdGhlICR7aGFuZGxlck5hbWV9IGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXJgXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMud3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbmZpZ1N0b3JhZ2UuZmluZFBhcmFtcyhcbiAgICAgICAgdGhpcy5XcmFwcGVyLFxuICAgICAgICBoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVcbiAgICAgIClcblxuICAgICAgY29uc3QgYXJncyA9IFtdXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgICAgYXJnc1twYXJhbS5wYXJhbWV0ZXJJbmRleF0gPSBhd2FpdCBwYXJhbS5yZXNvbHZlKGV2ZW50LCBjb250ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIuYXBwbHkodGhpcy53cmFwcGVyLCBhcmdzKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIGJlIHByb3BlciBlcnJvciBoYW5kbGluZyBtZWNoYW5pc20gZGVwZW5kaW5nIG9uIHNlcnZpY2VcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyQ2xhc3MgZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBFdmVudEJyaWRnZUV2ZW50PHN0cmluZywgYW55PlxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKGV2ZW50OiBFdmVudEJyaWRnZUV2ZW50PGFueSwgYW55Pikge1xuICAgIHJldHVybiBldmVudFsnZGV0YWlsLXR5cGUnXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudEJyaWRnZUV2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBFdmVudEJyaWRnZUV2ZW50Q29udHJvbGxlckNsYXNzKFdyYXBwZXIpXG5cbiAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxufVxuXG5leHBvcnQgY2xhc3MgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MgZXh0ZW5kcyBFdmVudENvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnksIGFueT5cbj4ge1xuICBnZXRIYW5kbGVyTmFtZShldmVudDogQXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGV2ZW50LmluZm8/LmZpZWxkTmFtZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXIoV3JhcHBlcjogYW55KSB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICByZXR1cm4gY29udHJvbGxlci5oYW5kbGVyLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG59XG5cbmV4cG9ydCBjbGFzcyBTM0V2ZW50Q29udHJvbGxlckNsYXNzIGV4dGVuZHMgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzczxcbiAgYW55LFxuICBTM0V2ZW50LFxuICBTM0V2ZW50UmVjb3JkXG4+IHtcbiAgZ2V0SGFuZGxlck5hbWUoZXZlbnQ6IFMzRXZlbnQpIHtcbiAgICByZXR1cm4gJ2FsbFJlY29yZHMnXG4gIH1cblxuICBnZXRSZWNvcmRIYW5kbGVyTmFtZShyZWNvcmQ6IFMzRXZlbnRSZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkLmV2ZW50TmFtZVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY29yZHNDb250cm9sbGVyUHJvcHMge1xuICBtb2RlOiAnZXZlbnQnIHwgJ3JlY29yZCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFMzRXZlbnRDb250cm9sbGVyKFxuICB7IG1vZGUgPSAncmVjb3JkJyB9OiBJUmVjb3Jkc0NvbnRyb2xsZXJQcm9wcyA9IHt9IGFzIGFueVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBTM0V2ZW50Q29udHJvbGxlcihXcmFwcGVyOiBhbnkpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IFMzRXZlbnRDb250cm9sbGVyQ2xhc3MoV3JhcHBlcilcblxuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAncmVjb3JkJzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIucmVjb3Jkc0hhbmRsZXIuYmluZChjb250cm9sbGVyKSBhcyBhbnlcbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlci5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxuICAgIH1cbiAgfVxufVxuIl19