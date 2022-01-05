"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caller = exports.getConfigurationStorage = void 0;
const configuration_storage_1 = require("./configurator/configuration-storage");
const CONFIGURATION_STORAGE_SYMBOL = Symbol('LAMBDA_STD_CONFIGURATION_STORAGE');
function getConfigurationStorage() {
    return (global[CONFIGURATION_STORAGE_SYMBOL] =
        global[CONFIGURATION_STORAGE_SYMBOL] || new configuration_storage_1.ConfigurationStorage());
}
exports.getConfigurationStorage = getConfigurationStorage;
function caller(input) {
    return input;
}
exports.caller = caller;
__exportStar(require("./configurator/configuration-storage"), exports);
__exportStar(require("./decorators/controllers"), exports);
__exportStar(require("./decorators/handler"), exports);
__exportStar(require("./decorators/initializer"), exports);
__exportStar(require("./decorators/param"), exports);
__exportStar(require("./decorators/validator"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLGdGQUEyRTtBQUUzRSxNQUFNLDRCQUE0QixHQUFHLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRS9FLFNBQWdCLHVCQUF1QjtJQUNyQyxPQUFPLENBQUUsTUFBYyxDQUFDLDRCQUE0QixDQUFDO1FBQ2xELE1BQWMsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLElBQUksNENBQW9CLEVBQUUsQ0FBQyxDQUFBO0FBQ2hGLENBQUM7QUFIRCwwREFHQztBQUVELFNBQWdCLE1BQU0sQ0FBTyxLQUFjO0lBQ3pDLE9BQU8sS0FBb0QsQ0FBQTtBQUM3RCxDQUFDO0FBRkQsd0JBRUM7QUFFRCx1RUFBb0Q7QUFDcEQsMkRBQXdDO0FBQ3hDLHVEQUFvQztBQUNwQywyREFBd0M7QUFDeEMscURBQWtDO0FBQ2xDLHlEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRleHQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci9jb25maWd1cmF0aW9uLXN0b3JhZ2UnXG5cbmNvbnN0IENPTkZJR1VSQVRJT05fU1RPUkFHRV9TWU1CT0wgPSBTeW1ib2woJ0xBTUJEQV9TVERfQ09ORklHVVJBVElPTl9TVE9SQUdFJylcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCk6IENvbmZpZ3VyYXRpb25TdG9yYWdlIHtcbiAgcmV0dXJuICgoZ2xvYmFsIGFzIGFueSlbQ09ORklHVVJBVElPTl9TVE9SQUdFX1NZTUJPTF0gPVxuICAgIChnbG9iYWwgYXMgYW55KVtDT05GSUdVUkFUSU9OX1NUT1JBR0VfU1lNQk9MXSB8fCBuZXcgQ29uZmlndXJhdGlvblN0b3JhZ2UoKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxlcjxULCBSPihpbnB1dDogdW5rbm93bikge1xuICByZXR1cm4gaW5wdXQgYXMgKGV2ZW50OiBULCBjb250ZXh0PzogQ29udGV4dCkgPT4gUHJvbWlzZTxSPlxufVxuXG5leHBvcnQgKiBmcm9tICcuL2NvbmZpZ3VyYXRvci9jb25maWd1cmF0aW9uLXN0b3JhZ2UnXG5leHBvcnQgKiBmcm9tICcuL2RlY29yYXRvcnMvY29udHJvbGxlcnMnXG5leHBvcnQgKiBmcm9tICcuL2RlY29yYXRvcnMvaGFuZGxlcidcbmV4cG9ydCAqIGZyb20gJy4vZGVjb3JhdG9ycy9pbml0aWFsaXplcidcbmV4cG9ydCAqIGZyb20gJy4vZGVjb3JhdG9ycy9wYXJhbSdcbmV4cG9ydCAqIGZyb20gJy4vZGVjb3JhdG9ycy92YWxpZGF0b3InXG4iXX0=