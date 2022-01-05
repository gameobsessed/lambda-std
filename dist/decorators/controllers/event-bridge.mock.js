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
exports.ErrorController = exports.mockedErrorHandler = void 0;
const __1 = require("../..");
exports.mockedErrorHandler = jest.fn();
class ErrorService {
    constructor() {
        throw new Error('ErrorService');
    }
    async handle(model) {
        throw new Error('service error');
    }
}
class ErrorModel {
    constructor() {
        throw new Error('ErrorModel');
    }
}
let ErrorController = class ErrorController {
    async init() {
        this.errorService = new ErrorService();
    }
    async handler(model) {
        const result = await this.errorService.handle(model);
        return result;
    }
};
__decorate([
    __1.Initializer,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ErrorController.prototype, "init", null);
__decorate([
    (0, __1.DetailType)('TRIGGER'),
    __param(0, (0, __1.Detail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ErrorModel]),
    __metadata("design:returntype", Promise)
], ErrorController.prototype, "handler", null);
ErrorController = __decorate([
    (0, __1.EventBridgeEventController)({ errorHandler: exports.mockedErrorHandler })
], ErrorController);
exports.ErrorController = ErrorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYnJpZGdlLm1vY2suanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9jb250cm9sbGVycy9ldmVudC1icmlkZ2UubW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFNYztBQUVELFFBQUEsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBO0FBRTNDLE1BQU0sWUFBWTtJQUNoQjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBVTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7Q0FDRjtBQUVELE1BQU0sVUFBVTtJQUNkO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUMvQixDQUFDO0NBQ0Y7QUFHRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSTFCLEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO0lBQ3hDLENBQUM7SUFHRCxLQUFLLENBQUMsT0FBTyxDQUFXLEtBQWlCO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEQsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQVRDO0lBREMsZUFBVzs7OzsyQ0FHWDtBQUdEO0lBREMsSUFBQSxjQUFVLEVBQUMsU0FBUyxDQUFDO0lBQ1AsV0FBQSxJQUFBLFVBQU0sR0FBRSxDQUFBOztxQ0FBUSxVQUFVOzs4Q0FHeEM7QUFaVSxlQUFlO0lBRDNCLElBQUEsOEJBQTBCLEVBQUMsRUFBRSxZQUFZLEVBQUUsMEJBQWtCLEVBQUUsQ0FBQztHQUNwRCxlQUFlLENBYTNCO0FBYlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjYWxsZXIsXG4gIERldGFpbCxcbiAgRGV0YWlsVHlwZSxcbiAgRXZlbnRCcmlkZ2VFdmVudENvbnRyb2xsZXIsXG4gIEluaXRpYWxpemVyLFxufSBmcm9tICcuLi8uLidcblxuZXhwb3J0IGNvbnN0IG1vY2tlZEVycm9ySGFuZGxlciA9IGplc3QuZm4oKVxuXG5jbGFzcyBFcnJvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yU2VydmljZScpXG4gIH1cblxuICBhc3luYyBoYW5kbGUobW9kZWw6IGFueSkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2VydmljZSBlcnJvcicpXG4gIH1cbn1cblxuY2xhc3MgRXJyb3JNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRXJyb3JNb2RlbCcpXG4gIH1cbn1cblxuQEV2ZW50QnJpZGdlRXZlbnRDb250cm9sbGVyKHsgZXJyb3JIYW5kbGVyOiBtb2NrZWRFcnJvckhhbmRsZXIgfSlcbmV4cG9ydCBjbGFzcyBFcnJvckNvbnRyb2xsZXIge1xuICBlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZVxuXG4gIEBJbml0aWFsaXplclxuICBhc3luYyBpbml0KCkge1xuICAgIHRoaXMuZXJyb3JTZXJ2aWNlID0gbmV3IEVycm9yU2VydmljZSgpXG4gIH1cblxuICBARGV0YWlsVHlwZSgnVFJJR0dFUicpXG4gIGFzeW5jIGhhbmRsZXIoQERldGFpbCgpIG1vZGVsOiBFcnJvck1vZGVsKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5lcnJvclNlcnZpY2UuaGFuZGxlKG1vZGVsKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuIl19