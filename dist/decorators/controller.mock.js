"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = exports.Game = exports.ProductController = exports.ProductInput = void 0;
const Joi = require("joi");
const __1 = require("..");
const productInputSchema = Joi.object({
    id: Joi.string().required(),
});
let ProductInput = class ProductInput {
};
ProductInput = __decorate([
    (0, __1.Validator)((input) => productInputSchema.validateAsync(input, {
        abortEarly: false,
        stripUnknown: true,
    }))
], ProductInput);
exports.ProductInput = ProductInput;
let ProductController = class ProductController {
    async getProduct(id) {
        return id;
    }
    async createProduct(input) {
        return input;
    }
};
__decorate([
    (0, __1.Query)(),
    __param(0, (0, __1.Arguments)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, __1.Mutation)(),
    __param(0, (0, __1.Arguments)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
ProductController = __decorate([
    (0, __1.AppSyncResolverEventController)()
], ProductController);
exports.ProductController = ProductController;
class Game {
    constructor() {
        this.status = 'validation';
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.Game = Game;
let GameController = class GameController {
    async updateGame(product) {
        return product;
    }
    async publishGame(product) {
        product.setStatus('published');
        return product;
    }
};
__decorate([
    (0, __1.DetailType)('GAME_UPDATED'),
    __param(0, (0, __1.Detail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Game]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    (0, __1.DetailType)('GAME_PUBLISHED'),
    __param(0, (0, __1.Detail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Game]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "publishGame", null);
GameController = __decorate([
    (0, __1.EventBridgeEventController)()
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5tb2NrLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUEwQjtBQUMxQiwwQkFVVztBQUVYLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUM1QixDQUFDLENBQUE7QUFRRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBRXhCLENBQUE7QUFGWSxZQUFZO0lBTnhCLElBQUEsYUFBUyxFQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDeEIsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtRQUN0QyxVQUFVLEVBQUUsS0FBSztRQUNqQixZQUFZLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQ0g7R0FDWSxZQUFZLENBRXhCO0FBRlksb0NBQVk7QUFLekIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsS0FBSyxDQUFDLFVBQVUsQ0FBa0IsRUFBVTtRQUMxQyxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFHRCxLQUFLLENBQUMsYUFBYSxDQUFxQixLQUFtQjtRQUN6RCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFBO0FBUkM7SUFEQyxJQUFBLFNBQUssR0FBRTtJQUNVLFdBQUEsSUFBQSxhQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7bURBRWhDO0FBR0Q7SUFEQyxJQUFBLFlBQVEsR0FBRTtJQUNVLFdBQUEsSUFBQSxhQUFTLEVBQUMsT0FBTyxDQUFDLENBQUE7O3FDQUFRLFlBQVk7O3NEQUUxRDtBQVRVLGlCQUFpQjtJQUQ3QixJQUFBLGtDQUE4QixHQUFFO0dBQ3BCLGlCQUFpQixDQVU3QjtBQVZZLDhDQUFpQjtBQVk5QixNQUFhLElBQUk7SUFBakI7UUFFRSxXQUFNLEdBQVcsWUFBWSxDQUFBO0lBSy9CLENBQUM7SUFIQyxTQUFTLENBQUMsTUFBYztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7QUFQRCxvQkFPQztBQUdELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFFekIsS0FBSyxDQUFDLFVBQVUsQ0FBVyxPQUFhO1FBQ3RDLE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFHRCxLQUFLLENBQUMsV0FBVyxDQUFXLE9BQWE7UUFDdkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM5QixPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQVRDO0lBREMsSUFBQSxjQUFVLEVBQUMsY0FBYyxDQUFDO0lBQ1QsV0FBQSxJQUFBLFVBQU0sR0FBRSxDQUFBOztxQ0FBVSxJQUFJOztnREFFdkM7QUFHRDtJQURDLElBQUEsY0FBVSxFQUFDLGdCQUFnQixDQUFDO0lBQ1YsV0FBQSxJQUFBLFVBQU0sR0FBRSxDQUFBOztxQ0FBVSxJQUFJOztpREFHeEM7QUFWVSxjQUFjO0lBRDFCLElBQUEsOEJBQTBCLEdBQUU7R0FDaEIsY0FBYyxDQVcxQjtBQVhZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSm9pIGZyb20gJ2pvaSdcbmltcG9ydCB7XG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlcixcbiAgQXJndW1lbnRzLFxuICBEZXRhaWwsXG4gIERldGFpbFR5cGUsXG4gIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyLFxuICBJbml0aWFsaXplcixcbiAgTXV0YXRpb24sXG4gIFF1ZXJ5LFxuICBWYWxpZGF0b3IsXG59IGZyb20gJy4uJ1xuXG5jb25zdCBwcm9kdWN0SW5wdXRTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgaWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSlcblxuQFZhbGlkYXRvcigoaW5wdXQ6IGFueSkgPT5cbiAgcHJvZHVjdElucHV0U2NoZW1hLnZhbGlkYXRlQXN5bmMoaW5wdXQsIHtcbiAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICBzdHJpcFVua25vd246IHRydWUsXG4gIH0pXG4pXG5leHBvcnQgY2xhc3MgUHJvZHVjdElucHV0IHtcbiAgaWQ6IHN0cmluZ1xufVxuXG5AQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XG4gIEBRdWVyeSgpXG4gIGFzeW5jIGdldFByb2R1Y3QoQEFyZ3VtZW50cygnaWQnKSBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBATXV0YXRpb24oKVxuICBhc3luYyBjcmVhdGVQcm9kdWN0KEBBcmd1bWVudHMoJ2lucHV0JykgaW5wdXQ6IFByb2R1Y3RJbnB1dCkge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgaWQ6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZyA9ICd2YWxpZGF0aW9uJ1xuXG4gIHNldFN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gIH1cbn1cblxuQEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbGxlciB7XG4gIEBEZXRhaWxUeXBlKCdHQU1FX1VQREFURUQnKVxuICBhc3luYyB1cGRhdGVHYW1lKEBEZXRhaWwoKSBwcm9kdWN0OiBHYW1lKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RcbiAgfVxuXG4gIEBEZXRhaWxUeXBlKCdHQU1FX1BVQkxJU0hFRCcpXG4gIGFzeW5jIHB1Ymxpc2hHYW1lKEBEZXRhaWwoKSBwcm9kdWN0OiBHYW1lKSB7XG4gICAgcHJvZHVjdC5zZXRTdGF0dXMoJ3B1Ymxpc2hlZCcpXG4gICAgcmV0dXJuIHByb2R1Y3RcbiAgfVxufVxuIl19