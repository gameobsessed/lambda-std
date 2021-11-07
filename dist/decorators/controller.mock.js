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
const yup_1 = require("yup");
const __1 = require("..");
const productInputSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
});
let ProductInput = class ProductInput {
};
ProductInput = __decorate([
    (0, __1.Validator)(productInputSchema)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5tb2NrLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUFvQztBQUNwQywwQkFTVztBQUVYLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxZQUFNLEVBQUM7SUFDaEMsRUFBRSxFQUFFLElBQUEsWUFBTSxHQUFFLENBQUMsUUFBUSxFQUFFO0NBQ3hCLENBQUMsQ0FBQTtBQUdGLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FFeEIsQ0FBQTtBQUZZLFlBQVk7SUFEeEIsSUFBQSxhQUFTLEVBQUMsa0JBQWtCLENBQUM7R0FDakIsWUFBWSxDQUV4QjtBQUZZLG9DQUFZO0FBS3pCLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTVCLEtBQUssQ0FBQyxVQUFVLENBQWtCLEVBQVU7UUFDMUMsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBR0QsS0FBSyxDQUFDLGFBQWEsQ0FBcUIsS0FBbUI7UUFDekQsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQVJDO0lBREMsSUFBQSxTQUFLLEdBQUU7SUFDVSxXQUFBLElBQUEsYUFBUyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O21EQUVoQztBQUdEO0lBREMsSUFBQSxZQUFRLEdBQUU7SUFDVSxXQUFBLElBQUEsYUFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFBOztxQ0FBUSxZQUFZOztzREFFMUQ7QUFUVSxpQkFBaUI7SUFEN0Isa0NBQThCO0dBQ2xCLGlCQUFpQixDQVU3QjtBQVZZLDhDQUFpQjtBQVk5QixNQUFhLElBQUk7SUFBakI7UUFFRSxXQUFNLEdBQVcsWUFBWSxDQUFBO0lBSy9CLENBQUM7SUFIQyxTQUFTLENBQUMsTUFBYztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7QUFQRCxvQkFPQztBQUdELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFFekIsS0FBSyxDQUFDLFVBQVUsQ0FBVyxPQUFhO1FBQ3RDLE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFHRCxLQUFLLENBQUMsV0FBVyxDQUFXLE9BQWE7UUFDdkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM5QixPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQVRDO0lBREMsSUFBQSxjQUFVLEVBQUMsY0FBYyxDQUFDO0lBQ1QsV0FBQSxJQUFBLFVBQU0sR0FBRSxDQUFBOztxQ0FBVSxJQUFJOztnREFFdkM7QUFHRDtJQURDLElBQUEsY0FBVSxFQUFDLGdCQUFnQixDQUFDO0lBQ1YsV0FBQSxJQUFBLFVBQU0sR0FBRSxDQUFBOztxQ0FBVSxJQUFJOztpREFHeEM7QUFWVSxjQUFjO0lBRDFCLDhCQUEwQjtHQUNkLGNBQWMsQ0FXMUI7QUFYWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCwgc3RyaW5nIH0gZnJvbSAneXVwJ1xuaW1wb3J0IHtcbiAgQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyLFxuICBBcmd1bWVudHMsXG4gIERldGFpbCxcbiAgRGV0YWlsVHlwZSxcbiAgRXZlbnRCcmlkZ2VFdmVudENvbnRyb2xsZXIsXG4gIE11dGF0aW9uLFxuICBRdWVyeSxcbiAgVmFsaWRhdG9yLFxufSBmcm9tICcuLidcblxuY29uc3QgcHJvZHVjdElucHV0U2NoZW1hID0gb2JqZWN0KHtcbiAgaWQ6IHN0cmluZygpLnJlcXVpcmVkKCksXG59KVxuXG5AVmFsaWRhdG9yKHByb2R1Y3RJbnB1dFNjaGVtYSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW5wdXQge1xuICBpZDogc3RyaW5nXG59XG5cbkBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XG4gIEBRdWVyeSgpXG4gIGFzeW5jIGdldFByb2R1Y3QoQEFyZ3VtZW50cygnaWQnKSBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBATXV0YXRpb24oKVxuICBhc3luYyBjcmVhdGVQcm9kdWN0KEBBcmd1bWVudHMoJ2lucHV0JykgaW5wdXQ6IFByb2R1Y3RJbnB1dCkge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgaWQ6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZyA9ICd2YWxpZGF0aW9uJ1xuXG4gIHNldFN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gIH1cbn1cblxuQEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICBARGV0YWlsVHlwZSgnR0FNRV9VUERBVEVEJylcbiAgYXN5bmMgdXBkYXRlR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cblxuICBARGV0YWlsVHlwZSgnR0FNRV9QVUJMSVNIRUQnKVxuICBhc3luYyBwdWJsaXNoR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHByb2R1Y3Quc2V0U3RhdHVzKCdwdWJsaXNoZWQnKVxuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cbn1cbiJdfQ==