"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3EventController = exports.S3EventControllerClass = void 0;
const controller_1 = require("./controller");
const error_handler_1 = require("./error-handler");
class S3EventControllerClass extends controller_1.RecordsControllerClass {
    getHandlerName() {
        return 'allRecords';
    }
    getRecordHandlerName(record) {
        return record.eventName;
    }
}
exports.S3EventControllerClass = S3EventControllerClass;
function S3EventController({ mode = 'record', errorHandler = error_handler_1.defaultErrorHandler, } = {}) {
    return function S3EventController(UserControllerCtor) {
        const controller = new S3EventControllerClass(UserControllerCtor);
        try {
            switch (mode) {
                case 'record':
                    return controller.handleRecords.bind(controller);
                case 'event':
                    return controller.handle.bind(controller);
            }
        }
        catch (error) {
            return errorHandler(error);
        }
    };
}
exports.S3EventController = S3EventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9jb250cm9sbGVycy9zMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBMEU7QUFDMUUsbURBQW9FO0FBRXBFLE1BQWEsc0JBQXVCLFNBQVEsbUNBRzNDO0lBQ0MsY0FBYztRQUNaLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUFxQjtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBWEQsd0RBV0M7QUFPRCxTQUFnQixpQkFBaUIsQ0FDL0IsRUFDRSxJQUFJLEdBQUcsUUFBUSxFQUNmLFlBQVksR0FBRyxtQ0FBbUIsTUFDUCxFQUFTO0lBRXRDLE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxrQkFBdUM7UUFDdkUsTUFBTSxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBRWpFLElBQUk7WUFDRixRQUFRLElBQUksRUFBRTtnQkFDWixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVEsQ0FBQTtnQkFDekQsS0FBSyxPQUFPO29CQUNWLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUE7YUFDbkQ7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDM0I7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBcEJELDhDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzRXZlbnQsIFMzRXZlbnRSZWNvcmQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgSVVzZXJDb250cm9sbGVyQ3RvciwgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzcyB9IGZyb20gJy4vY29udHJvbGxlcidcbmltcG9ydCB7IGRlZmF1bHRFcnJvckhhbmRsZXIsIElFcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWhhbmRsZXInXG5cbmV4cG9ydCBjbGFzcyBTM0V2ZW50Q29udHJvbGxlckNsYXNzIGV4dGVuZHMgUmVjb3Jkc0NvbnRyb2xsZXJDbGFzczxcbiAgUzNFdmVudCxcbiAgUzNFdmVudFJlY29yZFxuPiB7XG4gIGdldEhhbmRsZXJOYW1lKCkge1xuICAgIHJldHVybiAnYWxsUmVjb3JkcydcbiAgfVxuXG4gIGdldFJlY29yZEhhbmRsZXJOYW1lKHJlY29yZDogUzNFdmVudFJlY29yZCkge1xuICAgIHJldHVybiByZWNvcmQuZXZlbnROYW1lXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVjb3Jkc0NvbnRyb2xsZXJQcm9wcyB7XG4gIG1vZGU6ICdldmVudCcgfCAncmVjb3JkJ1xuICBlcnJvckhhbmRsZXI/OiBJRXJyb3JIYW5kbGVyPGFueT5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFMzRXZlbnRDb250cm9sbGVyKFxuICB7XG4gICAgbW9kZSA9ICdyZWNvcmQnLFxuICAgIGVycm9ySGFuZGxlciA9IGRlZmF1bHRFcnJvckhhbmRsZXIsXG4gIH06IElSZWNvcmRzQ29udHJvbGxlclByb3BzID0ge30gYXMgYW55XG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFMzRXZlbnRDb250cm9sbGVyKFVzZXJDb250cm9sbGVyQ3RvcjogSVVzZXJDb250cm9sbGVyQ3Rvcikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgUzNFdmVudENvbnRyb2xsZXJDbGFzcyhVc2VyQ29udHJvbGxlckN0b3IpXG5cbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgIGNhc2UgJ3JlY29yZCc6XG4gICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlUmVjb3Jkcy5iaW5kKGNvbnRyb2xsZXIpIGFzIGFueVxuICAgICAgICBjYXNlICdldmVudCc6XG4gICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuaGFuZGxlLmJpbmQoY29udHJvbGxlcikgYXMgYW55XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIoZXJyb3IpXG4gICAgfVxuICB9XG59XG4iXX0=