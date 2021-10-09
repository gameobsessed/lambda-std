"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const controller_mock_1 = require("./controller.mock");
describe('controller', () => {
    it('should create appsync controller', async () => {
        const id = 'uuid';
        const event = {
            info: {
                fieldName: 'getProduct',
            },
            arguments: {
                id,
            },
        };
        const result = await (0, __1.caller)(controller_mock_1.ProductController)(event);
        expect(result).toBe(id);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci50ZXN0LmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMEJBQTJCO0FBQzNCLHVEQUFxRDtBQUVyRCxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDaEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLE1BQU0sS0FBSyxHQUF1QztZQUNoRCxJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLFlBQVk7YUFDakI7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsRUFBRTthQUNIO1NBQ0YsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxVQUFNLEVBQ3pCLG1DQUFpQixDQUNsQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRVIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3luY1Jlc29sdmVyRXZlbnQgfSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0IHsgY2FsbGVyIH0gZnJvbSAnLi4nXG5pbXBvcnQgeyBQcm9kdWN0Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5tb2NrJ1xuXG5kZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBjcmVhdGUgYXBwc3luYyBjb250cm9sbGVyJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gJ3V1aWQnXG4gICAgY29uc3QgZXZlbnQ6IFBhcnRpYWw8QXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pj4gPSB7XG4gICAgICBpbmZvOiB7XG4gICAgICAgIGZpZWxkTmFtZTogJ2dldFByb2R1Y3QnLFxuICAgICAgfSBhcyBhbnksXG4gICAgICBhcmd1bWVudHM6IHtcbiAgICAgICAgaWQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGxlcjxhbnksIHsgZ2FtZTogYW55OyB0eXBlOiBhbnkgfT4oXG4gICAgICBQcm9kdWN0Q29udHJvbGxlclxuICAgICkoZXZlbnQpXG5cbiAgICBleHBlY3QocmVzdWx0KS50b0JlKGlkKVxuICB9KVxufSlcbiJdfQ==