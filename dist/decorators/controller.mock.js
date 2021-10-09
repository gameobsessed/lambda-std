"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const controller_1 = require("./controller");
const handler_1 = require("./handler");
const param_1 = require("./param");
let ProductController = class ProductController {
    async getProduct(id) {
        return id;
    }
};
__decorate([
    (0, handler_1.Query)(),
    __param(0, (0, param_1.Arguments)('id'))
], ProductController.prototype, "getProduct", null);
ProductController = __decorate([
    controller_1.AppSyncResolverEventController
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5tb2NrLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE2RDtBQUM3RCx1Q0FBaUM7QUFDakMsbUNBQW1DO0FBR25DLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTVCLEtBQUssQ0FBQyxVQUFVLENBQWtCLEVBQVU7UUFDMUMsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsSUFBQSxlQUFLLEdBQUU7SUFDVSxXQUFBLElBQUEsaUJBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQTttREFFaEM7QUFKVSxpQkFBaUI7SUFEN0IsMkNBQThCO0dBQ2xCLGlCQUFpQixDQUs3QjtBQUxZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcidcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSAnLi9oYW5kbGVyJ1xuaW1wb3J0IHsgQXJndW1lbnRzIH0gZnJvbSAnLi9wYXJhbSdcblxuQEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RDb250cm9sbGVyIHtcbiAgQFF1ZXJ5KClcbiAgYXN5bmMgZ2V0UHJvZHVjdChAQXJndW1lbnRzKCdpZCcpIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gaWRcbiAgfVxufVxuIl19