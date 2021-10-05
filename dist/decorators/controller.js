"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMEJBQTRDO0FBRTVDLFNBQWdCLFVBQVUsQ0FBSSxPQUFZO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUEsMkJBQXVCLEdBQUUsQ0FBQTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO0tBQ25FO0lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhFLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNqRCxNQUFNLFdBQVcsR0FDZixpQkFBaUIsSUFBSSxPQUFPLENBQUMsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsVUFBVSxDQUFDLENBQUE7SUFDN0QsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRTFFLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUV2QixPQUFPLEtBQUssV0FBVyxLQUFRLEVBQUUsT0FBZ0I7UUFDL0MsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQTtTQUNuQjtRQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUVmLElBQUk7WUFDRixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ2pFO1lBRUQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQzFDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3JCO0lBQ0gsQ0FBUSxDQUFBO0FBQ1YsQ0FBQztBQW5DRCxnQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnYXdzLWxhbWJkYSdcbmltcG9ydCB7IGdldENvbmZpZ3VyYXRpb25TdG9yYWdlIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyPFQ+KFdyYXBwZXI6IGFueSkge1xuICBjb25zdCBjb25maWdTdG9yYWdlID0gZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICBjb25zdCBoYW5kbGVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSGFuZGxlcihXcmFwcGVyKVxuXG4gIGlmICghaGFuZGxlckNvbmZpZykge1xuICAgIHRocm93IG5ldyBFcnJvcignT25lIGhhbmRsZXIgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNvbnRyb2xsZXInKVxuICB9XG4gIGNvbnN0IGluaXRpYWxpemVyQ29uZmlnID0gY29uZmlnU3RvcmFnZS5maW5kSW5pdGlhbGl6ZXIoV3JhcHBlcilcblxuICBjb25zdCB3cmFwcGVyID0gbmV3IFdyYXBwZXIoKVxuICBjb25zdCBoYW5kbGVyID0gd3JhcHBlcltoYW5kbGVyQ29uZmlnLm1ldGhvZE5hbWVdXG4gIGNvbnN0IGluaXRpYWxpemVyID1cbiAgICBpbml0aWFsaXplckNvbmZpZyAmJiB3cmFwcGVyW2luaXRpYWxpemVyQ29uZmlnPy5tZXRob2ROYW1lXVxuICBjb25zdCBwYXJhbXMgPSBjb25maWdTdG9yYWdlLmZpbmRQYXJhbXMoV3JhcHBlciwgaGFuZGxlckNvbmZpZy5tZXRob2ROYW1lKVxuXG4gIGxldCBpbml0aWFsaXplZCA9IGZhbHNlXG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChldmVudDogVCwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGlmICghaW5pdGlhbGl6ZWQgJiYgaW5pdGlhbGl6ZXJDb25maWcpIHtcbiAgICAgIGF3YWl0IGluaXRpYWxpemVyLmNhbGwod3JhcHBlcilcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGFyZ3MgPSBbXVxuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgICAgIGFyZ3NbcGFyYW0ucGFyYW1ldGVySW5kZXhdID0gYXdhaXQgcGFyYW0ucmVzb2x2ZShldmVudCwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIuYXBwbHkod3JhcHBlciwgYXJncylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9XG4gIH0gYXMgYW55XG59XG4iXX0=