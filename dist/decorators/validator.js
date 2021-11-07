"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const __1 = require("..");
function Validator(schema, options) {
    return function (object) {
        (0, __1.getConfigurationStorage)().addValidator({
            object,
            schema,
            options,
        });
    };
}
exports.Validator = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBCQUE2RDtBQUU3RCxTQUFnQixTQUFTLENBQUMsTUFBdUIsRUFBRSxPQUFhO0lBQzlELE9BQU8sVUFBVSxNQUFXO1FBQzFCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxZQUFZLENBQUM7WUFDckMsTUFBTTtZQUNOLE1BQU07WUFDTixPQUFPO1NBQ1IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVJELDhCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UsIFZhbGlkYXRvclNjaGVtYSB9IGZyb20gJy4uJ1xuXG5leHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yKHNjaGVtYTogVmFsaWRhdG9yU2NoZW1hLCBvcHRpb25zPzogYW55KSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqZWN0OiBhbnkpIHtcbiAgICBnZXRDb25maWd1cmF0aW9uU3RvcmFnZSgpLmFkZFZhbGlkYXRvcih7XG4gICAgICBvYmplY3QsXG4gICAgICBzY2hlbWEsXG4gICAgICBvcHRpb25zLFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==