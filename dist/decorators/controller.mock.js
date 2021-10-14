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
exports.GameController = exports.Game = exports.ProductController = void 0;
const __1 = require("..");
let ProductController = class ProductController {
    async getProduct(id) {
        return id;
    }
};
__decorate([
    (0, __1.Query)(),
    __param(0, (0, __1.Arguments)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5tb2NrLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBCQU9XO0FBR1gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsS0FBSyxDQUFDLFVBQVUsQ0FBa0IsRUFBVTtRQUMxQyxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxJQUFBLFNBQUssR0FBRTtJQUNVLFdBQUEsSUFBQSxhQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7bURBRWhDO0FBSlUsaUJBQWlCO0lBRDdCLGtDQUE4QjtHQUNsQixpQkFBaUIsQ0FLN0I7QUFMWSw4Q0FBaUI7QUFPOUIsTUFBYSxJQUFJO0lBQWpCO1FBRUUsV0FBTSxHQUFXLFlBQVksQ0FBQTtJQUsvQixDQUFDO0lBSEMsU0FBUyxDQUFDLE1BQWM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQztDQUNGO0FBUEQsb0JBT0M7QUFHRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBRXpCLEtBQUssQ0FBQyxVQUFVLENBQVcsT0FBYTtRQUN0QyxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0lBR0QsS0FBSyxDQUFDLFdBQVcsQ0FBVyxPQUFhO1FBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDOUIsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztDQUNGLENBQUE7QUFUQztJQURDLElBQUEsY0FBVSxFQUFDLGNBQWMsQ0FBQztJQUNULFdBQUEsSUFBQSxVQUFNLEdBQUUsQ0FBQTs7cUNBQVUsSUFBSTs7Z0RBRXZDO0FBR0Q7SUFEQyxJQUFBLGNBQVUsRUFBQyxnQkFBZ0IsQ0FBQztJQUNWLFdBQUEsSUFBQSxVQUFNLEdBQUUsQ0FBQTs7cUNBQVUsSUFBSTs7aURBR3hDO0FBVlUsY0FBYztJQUQxQiw4QkFBMEI7R0FDZCxjQUFjLENBVzFCO0FBWFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBTeW5jUmVzb2x2ZXJFdmVudENvbnRyb2xsZXIsXG4gIEFyZ3VtZW50cyxcbiAgRGV0YWlsLFxuICBEZXRhaWxUeXBlLFxuICBFdmVudEJyaWRnZUV2ZW50Q29udHJvbGxlcixcbiAgUXVlcnksXG59IGZyb20gJy4uJ1xuXG5AQXBwU3luY1Jlc29sdmVyRXZlbnRDb250cm9sbGVyXG5leHBvcnQgY2xhc3MgUHJvZHVjdENvbnRyb2xsZXIge1xuICBAUXVlcnkoKVxuICBhc3luYyBnZXRQcm9kdWN0KEBBcmd1bWVudHMoJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBpZFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgaWQ6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZyA9ICd2YWxpZGF0aW9uJ1xuXG4gIHNldFN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzXG4gIH1cbn1cblxuQEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICBARGV0YWlsVHlwZSgnR0FNRV9VUERBVEVEJylcbiAgYXN5bmMgdXBkYXRlR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cblxuICBARGV0YWlsVHlwZSgnR0FNRV9QVUJMSVNIRUQnKVxuICBhc3luYyBwdWJsaXNoR2FtZShARGV0YWlsKCkgcHJvZHVjdDogR2FtZSkge1xuICAgIHByb2R1Y3Quc2V0U3RhdHVzKCdwdWJsaXNoZWQnKVxuICAgIHJldHVybiBwcm9kdWN0XG4gIH1cbn1cbiJdfQ==