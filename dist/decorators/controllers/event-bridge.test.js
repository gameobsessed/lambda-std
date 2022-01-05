"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const event_bridge_mock_1 = require("./event-bridge.mock");
describe('event bridge event controller', () => {
    describe('error handler', () => {
        it('should call error handler', async () => {
            event_bridge_mock_1.mockedErrorHandler.mockReturnValueOnce(true);
            const event = {
                'detail-type': 'TRIGGER',
                detail: {},
            };
            const result = await (0, __1.caller)(event_bridge_mock_1.ErrorController)(event);
            expect(event_bridge_mock_1.mockedErrorHandler).toBeCalled();
            expect(result).toBeTruthy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYnJpZGdlLnRlc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9jb250cm9sbGVycy9ldmVudC1icmlkZ2UudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZCQUE4QjtBQUM5QiwyREFBeUU7QUFFekUsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUM3QixFQUFFLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDekMsc0NBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUMsTUFBTSxLQUFLLEdBQXdDO2dCQUNqRCxhQUFhLEVBQUUsU0FBUztnQkFDeEIsTUFBTSxFQUFFLEVBQUU7YUFDWCxDQUFBO1lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLFVBQU0sRUFDekIsbUNBQWUsQ0FDaEIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUVSLE1BQU0sQ0FBQyxzQ0FBa0IsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEJyaWRnZUV2ZW50IH0gZnJvbSAnYXdzLWxhbWJkYSdcbmltcG9ydCB7IGNhbGxlciB9IGZyb20gJy4uLy4uJ1xuaW1wb3J0IHsgRXJyb3JDb250cm9sbGVyLCBtb2NrZWRFcnJvckhhbmRsZXIgfSBmcm9tICcuL2V2ZW50LWJyaWRnZS5tb2NrJ1xuXG5kZXNjcmliZSgnZXZlbnQgYnJpZGdlIGV2ZW50IGNvbnRyb2xsZXInLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdlcnJvciBoYW5kbGVyJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBlcnJvciBoYW5kbGVyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja2VkRXJyb3JIYW5kbGVyLm1vY2tSZXR1cm5WYWx1ZU9uY2UodHJ1ZSlcbiAgICAgIGNvbnN0IGV2ZW50OiBQYXJ0aWFsPEV2ZW50QnJpZGdlRXZlbnQ8YW55LCBhbnk+PiA9IHtcbiAgICAgICAgJ2RldGFpbC10eXBlJzogJ1RSSUdHRVInLFxuICAgICAgICBkZXRhaWw6IHt9LFxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxsZXI8YW55LCB7IGdhbWU6IGFueTsgdHlwZTogYW55IH0+KFxuICAgICAgICBFcnJvckNvbnRyb2xsZXJcbiAgICAgICkoZXZlbnQpXG5cbiAgICAgIGV4cGVjdChtb2NrZWRFcnJvckhhbmRsZXIpLnRvQmVDYWxsZWQoKVxuICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVRydXRoeSgpXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=