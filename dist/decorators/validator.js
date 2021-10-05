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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBCQUE0QztBQUU1QyxTQUFnQixTQUFTLENBQUMsTUFBdUIsRUFBRSxPQUFhO0lBQzlELE9BQU8sVUFBVSxNQUFXO1FBQzFCLElBQUEsMkJBQXVCLEdBQUUsQ0FBQyxZQUFZLENBQUM7WUFDckMsTUFBTTtZQUNOLE1BQU07WUFDTixPQUFPO1NBQ1IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVJELDhCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55T2JqZWN0U2NoZW1hIH0gZnJvbSAneXVwJ1xuaW1wb3J0IHsgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UgfSBmcm9tICcuLidcblxuZXhwb3J0IGZ1bmN0aW9uIFZhbGlkYXRvcihzY2hlbWE6IEFueU9iamVjdFNjaGVtYSwgb3B0aW9ucz86IGFueSkge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iamVjdDogYW55KSB7XG4gICAgZ2V0Q29uZmlndXJhdGlvblN0b3JhZ2UoKS5hZGRWYWxpZGF0b3Ioe1xuICAgICAgb2JqZWN0LFxuICAgICAgc2NoZW1hLFxuICAgICAgb3B0aW9ucyxcbiAgICB9KVxuICB9XG59XG4iXX0=