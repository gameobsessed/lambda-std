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
    __1.AppSyncResolverEventController
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
    __1.EventBridgeEventController
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5tb2NrLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUEwQjtBQUMxQiwwQkFTVztBQUVYLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUM1QixDQUFDLENBQUE7QUFRRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBRXhCLENBQUE7QUFGWSxZQUFZO0lBTnhCLElBQUEsYUFBUyxFQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDeEIsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtRQUN0QyxVQUFVLEVBQUUsS0FBSztRQUNqQixZQUFZLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQ0g7R0FDWSxZQUFZLENBRXhCO0FBRlksb0NBQVk7QUFLekIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsS0FBSyxDQUFDLFVBQVUsQ0FBa0IsRUFBVTtRQUMxQyxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFHRCxLQUFLLENBQUMsYUFBYSxDQUFxQixLQUFtQjtRQUN6RCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFBO0FBUkM7SUFEQyxJQUFBLFNBQUssR0FBRTtJQUNVLFdBQUEsSUFBQSxhQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7bURBRWhDO0FBR0Q7SUFEQyxJQUFBLFlBQVEsR0FBRTtJQUNVLFdBQUEsSUFBQSxhQUFTLEVBQUMsT0FBTyxDQUFDLENBQUE7O3FDQUFRLFlBQVk7O3NEQUUxRDtBQVRVLGlCQUFpQjtJQUQ3QixrQ0FBOEI7R0FDbEIsaUJBQWlCLENBVTdCO0FBVlksOENBQWlCO0FBWTlCLE1BQWEsSUFBSTtJQUFqQjtRQUVFLFdBQU0sR0FBVyxZQUFZLENBQUE7SUFLL0IsQ0FBQztJQUhDLFNBQVMsQ0FBQyxNQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3RCLENBQUM7Q0FDRjtBQVBELG9CQU9DO0FBR0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUV6QixLQUFLLENBQUMsVUFBVSxDQUFXLE9BQWE7UUFDdEMsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUdELEtBQUssQ0FBQyxXQUFXLENBQVcsT0FBYTtRQUN2QyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzlCLE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBVEM7SUFEQyxJQUFBLGNBQVUsRUFBQyxjQUFjLENBQUM7SUFDVCxXQUFBLElBQUEsVUFBTSxHQUFFLENBQUE7O3FDQUFVLElBQUk7O2dEQUV2QztBQUdEO0lBREMsSUFBQSxjQUFVLEVBQUMsZ0JBQWdCLENBQUM7SUFDVixXQUFBLElBQUEsVUFBTSxHQUFFLENBQUE7O3FDQUFVLElBQUk7O2lEQUd4QztBQVZVLGNBQWM7SUFEMUIsOEJBQTBCO0dBQ2QsY0FBYyxDQVcxQjtBQVhZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSm9pIGZyb20gJ2pvaSdcbmltcG9ydCB7XG4gIEFwcFN5bmNSZXNvbHZlckV2ZW50Q29udHJvbGxlcixcbiAgQXJndW1lbnRzLFxuICBEZXRhaWwsXG4gIERldGFpbFR5cGUsXG4gIEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyLFxuICBNdXRhdGlvbixcbiAgUXVlcnksXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnLi4nXG5cbmNvbnN0IHByb2R1Y3RJbnB1dFNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBpZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG59KVxuXG5AVmFsaWRhdG9yKChpbnB1dDogYW55KSA9PlxuICBwcm9kdWN0SW5wdXRTY2hlbWEudmFsaWRhdGVBc3luYyhpbnB1dCwge1xuICAgIGFib3J0RWFybHk6IGZhbHNlLFxuICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgfSlcbilcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW5wdXQge1xuICBpZDogc3RyaW5nXG59XG5cbkBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XG4gIEBRdWVyeSgpXG4gIGFzeW5jIGdldFByb2R1Y3QoQEFyZ3VtZW50cygnaWQnKSBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBATXV0YXRpb24oKVxuICBhc3luYyBjcmVhdGVQcm9kdWN0KEBBcmd1bWVudHMoJ2lucHV0JykgaW5wdXQ6IFByb2R1Y3RJbnB1dCkge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgaWQ6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZyA9ICd2YWxpZGF0aW9uJ1xuXG4gIHNldFN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gIH1cbn1cblxuQEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICBARGV0YWlsVHlwZSgnR0FNRV9VUERBVEVEJylcbiAgYXN5bmMgdXBkYXRlR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cblxuICBARGV0YWlsVHlwZSgnR0FNRV9QVUJMSVNIRUQnKVxuICBhc3luYyBwdWJsaXNoR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHByb2R1Y3Quc2V0U3RhdHVzKCdwdWJsaXNoZWQnKVxuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cbn1cbiJdfQ==