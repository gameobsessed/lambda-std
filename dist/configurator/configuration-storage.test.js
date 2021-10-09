"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('configuration storage', () => {
    it('should save and retrieve default handler', () => {
        const storage = new __1.ConfigurationStorage();
        const controller = () => { };
        const handler = {
            type: 'handler',
            object: controller,
            methodName: 'methodName',
        };
        storage.addHandler(handler);
        expect(storage.findHandler(controller.constructor)).toBe(handler);
    });
    it('should save and retrieve routed handler', () => {
        const storage = new __1.ConfigurationStorage();
        const controller = () => { };
        const route = 'getObject';
        const handler = {
            type: 'handler',
            object: controller,
            methodName: 'methodName',
            route,
        };
        storage.addHandler(handler);
        expect(storage.findHandler(controller.constructor)).toBeUndefined();
        expect(storage.findHandler(controller.constructor, route)).toBe(handler);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1zdG9yYWdlLnRlc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiY29uZmlndXJhdG9yL2NvbmZpZ3VyYXRpb24tc3RvcmFnZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQWdFO0FBRWhFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUFvQixFQUFFLENBQUE7UUFDMUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO1FBQzNCLE1BQU0sT0FBTyxHQUEwQjtZQUNyQyxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLFVBQVUsRUFBRSxZQUFZO1NBQ3pCLENBQUE7UUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsTUFBTSxPQUFPLEdBQUcsSUFBSSx3QkFBb0IsRUFBRSxDQUFBO1FBQzFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTtRQUMzQixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUE7UUFDekIsTUFBTSxPQUFPLEdBQTBCO1lBQ3JDLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLFVBQVU7WUFDbEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsS0FBSztTQUNOLENBQUE7UUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ25FLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDMUUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ3VyYXRpb25TdG9yYWdlLCBJSGFuZGxlckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLidcblxuZGVzY3JpYmUoJ2NvbmZpZ3VyYXRpb24gc3RvcmFnZScsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBzYXZlIGFuZCByZXRyaWV2ZSBkZWZhdWx0IGhhbmRsZXInLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IG5ldyBDb25maWd1cmF0aW9uU3RvcmFnZSgpXG4gICAgY29uc3QgY29udHJvbGxlciA9ICgpID0+IHt9XG4gICAgY29uc3QgaGFuZGxlcjogSUhhbmRsZXJDb25maWd1cmF0aW9uID0ge1xuICAgICAgdHlwZTogJ2hhbmRsZXInLFxuICAgICAgb2JqZWN0OiBjb250cm9sbGVyLFxuICAgICAgbWV0aG9kTmFtZTogJ21ldGhvZE5hbWUnLFxuICAgIH1cblxuICAgIHN0b3JhZ2UuYWRkSGFuZGxlcihoYW5kbGVyKVxuXG4gICAgZXhwZWN0KHN0b3JhZ2UuZmluZEhhbmRsZXIoY29udHJvbGxlci5jb25zdHJ1Y3RvcikpLnRvQmUoaGFuZGxlcilcbiAgfSlcblxuICBpdCgnc2hvdWxkIHNhdmUgYW5kIHJldHJpZXZlIHJvdXRlZCBoYW5kbGVyJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgQ29uZmlndXJhdGlvblN0b3JhZ2UoKVxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSAoKSA9PiB7fVxuICAgIGNvbnN0IHJvdXRlID0gJ2dldE9iamVjdCdcbiAgICBjb25zdCBoYW5kbGVyOiBJSGFuZGxlckNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICB0eXBlOiAnaGFuZGxlcicsXG4gICAgICBvYmplY3Q6IGNvbnRyb2xsZXIsXG4gICAgICBtZXRob2ROYW1lOiAnbWV0aG9kTmFtZScsXG4gICAgICByb3V0ZSxcbiAgICB9XG5cbiAgICBzdG9yYWdlLmFkZEhhbmRsZXIoaGFuZGxlcilcblxuICAgIGV4cGVjdChzdG9yYWdlLmZpbmRIYW5kbGVyKGNvbnRyb2xsZXIuY29uc3RydWN0b3IpKS50b0JlVW5kZWZpbmVkKClcbiAgICBleHBlY3Qoc3RvcmFnZS5maW5kSGFuZGxlcihjb250cm9sbGVyLmNvbnN0cnVjdG9yLCByb3V0ZSkpLnRvQmUoaGFuZGxlcilcbiAgfSlcbn0pXG4iXX0=