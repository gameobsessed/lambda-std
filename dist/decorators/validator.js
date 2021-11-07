"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const __1 = require("..");
function Validator(validate, options) {
    return function (object) {
        (0, __1.getConfigurationStorage)().addValidator({
            object,
            validate,
            options,
        });
    };
}
exports.Validator = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBCQUF1RDtBQUV2RCxTQUFnQixTQUFTLENBQUMsUUFBbUIsRUFBRSxPQUFhO0lBQzFELE9BQU8sVUFBVSxNQUFXO1FBQzFCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxZQUFZLENBQUM7WUFDckMsTUFBTTtZQUNOLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVJELDhCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UsIElWYWxpZGF0ZSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yKHZhbGlkYXRlOiBJVmFsaWRhdGUsIG9wdGlvbnM/OiBhbnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmplY3Q6IGFueSkge1xuICAgIGdldENvbmZpZ3VyYXRpb25TdG9yYWdlKCkuYWRkVmFsaWRhdG9yKHtcbiAgICAgIG9iamVjdCxcbiAgICAgIHZhbGlkYXRlLFxuICAgICAgb3B0aW9ucyxcbiAgICB9KVxuICB9XG59XG4iXX0=