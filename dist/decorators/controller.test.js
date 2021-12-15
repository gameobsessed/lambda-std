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
    it('should call appsync controller mutation', async () => {
        const id = 'uuid';
        const event = {
            info: {
                fieldName: 'createProduct',
            },
            arguments: {
                input: {
                    id,
                },
            },
        };
        const result = await (0, __1.caller)(controller_mock_1.ProductController)(event);
        expect(result.id).toBe(id);
    });
    it('should throw error from appsync controller mutation', async () => {
        const event = {
            info: {
                fieldName: 'createProduct',
            },
            arguments: {
                input: {},
            },
        };
        const result = (0, __1.caller)(controller_mock_1.ProductController)(event);
        await expect(async () => await result).rejects.toThrow();
    });
    it('should create event bridge controller for update', async () => {
        const game = {
            id: 'gameId',
        };
        const event = {
            'detail-type': 'GAME_UPDATED',
            detail: game,
        };
        const result = await (0, __1.caller)(controller_mock_1.GameController)(event);
        expect(result).toEqual({ ...game, status: 'validation' });
        expect(result).toBeInstanceOf(controller_mock_1.Game);
    });
    it('should create event bridge controller for publish', async () => {
        const game = {
            id: 'gameId',
        };
        const event = {
            'detail-type': 'GAME_PUBLISHED',
            detail: game,
        };
        const result = await (0, __1.caller)(controller_mock_1.GameController)(event);
        expect(result).toEqual({ ...game, status: 'published' });
        expect(result).toBeInstanceOf(controller_mock_1.Game);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci50ZXN0LmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvY29udHJvbGxlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMEJBQTJCO0FBQzNCLHVEQUEyRTtBQUUzRSxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDaEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLE1BQU0sS0FBSyxHQUF1QztZQUNoRCxJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLFlBQVk7YUFDakI7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsRUFBRTthQUNIO1NBQ0YsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxVQUFNLEVBQ3pCLG1DQUFpQixDQUNsQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRVIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN2RCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDakIsTUFBTSxLQUFLLEdBQXVDO1lBQ2hELElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsZUFBZTthQUNwQjtZQUNSLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUU7b0JBQ0wsRUFBRTtpQkFDSDthQUNGO1NBQ0YsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxVQUFNLEVBQ3pCLG1DQUFpQixDQUNsQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRVIsTUFBTSxDQUFFLE1BQW9DLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ25FLE1BQU0sS0FBSyxHQUF1QztZQUNoRCxJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLGVBQWU7YUFDcEI7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUE7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLFVBQU0sRUFBZ0MsbUNBQWlCLENBQUMsQ0FDckUsS0FBSyxDQUNOLENBQUE7UUFFRCxNQUFNLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLE1BQU0sTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHO1lBQ1gsRUFBRSxFQUFFLFFBQVE7U0FDYixDQUFBO1FBQ0QsTUFBTSxLQUFLLEdBQXdDO1lBQ2pELGFBQWEsRUFBRSxjQUFjO1lBQzdCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxVQUFNLEVBQWdDLGdDQUFjLENBQUMsQ0FDeEUsS0FBSyxDQUNOLENBQUE7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxzQkFBSSxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsbURBQW1ELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakUsTUFBTSxJQUFJLEdBQUc7WUFDWCxFQUFFLEVBQUUsUUFBUTtTQUNiLENBQUE7UUFDRCxNQUFNLEtBQUssR0FBd0M7WUFDakQsYUFBYSxFQUFFLGdCQUFnQjtZQUMvQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUE7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsVUFBTSxFQUFnQyxnQ0FBYyxDQUFDLENBQ3hFLEtBQUssQ0FDTixDQUFBO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsc0JBQUksQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBTeW5jUmVzb2x2ZXJFdmVudCwgRXZlbnRCcmlkZ2VFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnXG5pbXBvcnQgeyBjYWxsZXIgfSBmcm9tICcuLidcbmltcG9ydCB7IEdhbWUsIEdhbWVDb250cm9sbGVyLCBQcm9kdWN0Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5tb2NrJ1xuXG5kZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBjcmVhdGUgYXBwc3luYyBjb250cm9sbGVyJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gJ3V1aWQnXG4gICAgY29uc3QgZXZlbnQ6IFBhcnRpYWw8QXBwU3luY1Jlc29sdmVyRXZlbnQ8YW55Pj4gPSB7XG4gICAgICBpbmZvOiB7XG4gICAgICAgIGZpZWxkTmFtZTogJ2dldFByb2R1Y3QnLFxuICAgICAgfSBhcyBhbnksXG4gICAgICBhcmd1bWVudHM6IHtcbiAgICAgICAgaWQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGxlcjxhbnksIHsgZ2FtZTogYW55OyB0eXBlOiBhbnkgfT4oXG4gICAgICBQcm9kdWN0Q29udHJvbGxlclxuICAgICkoZXZlbnQpXG5cbiAgICBleHBlY3QocmVzdWx0KS50b0JlKGlkKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgY2FsbCBhcHBzeW5jIGNvbnRyb2xsZXIgbXV0YXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaWQgPSAndXVpZCdcbiAgICBjb25zdCBldmVudDogUGFydGlhbDxBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnk+PiA9IHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgZmllbGROYW1lOiAnY3JlYXRlUHJvZHVjdCcsXG4gICAgICB9IGFzIGFueSxcbiAgICAgIGFyZ3VtZW50czoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIGlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxsZXI8YW55LCB7IGdhbWU6IGFueTsgdHlwZTogYW55IH0+KFxuICAgICAgUHJvZHVjdENvbnRyb2xsZXJcbiAgICApKGV2ZW50KVxuXG4gICAgZXhwZWN0KChyZXN1bHQgYXMgdW5rbm93biBhcyB7IGlkOiBzdHJpbmcgfSkuaWQpLnRvQmUoaWQpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmcm9tIGFwcHN5bmMgY29udHJvbGxlciBtdXRhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBldmVudDogUGFydGlhbDxBcHBTeW5jUmVzb2x2ZXJFdmVudDxhbnk+PiA9IHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgZmllbGROYW1lOiAnY3JlYXRlUHJvZHVjdCcsXG4gICAgICB9IGFzIGFueSxcbiAgICAgIGFyZ3VtZW50czoge1xuICAgICAgICBpbnB1dDoge30sXG4gICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxlcjxhbnksIHsgZ2FtZTogYW55OyB0eXBlOiBhbnkgfT4oUHJvZHVjdENvbnRyb2xsZXIpKFxuICAgICAgZXZlbnRcbiAgICApXG5cbiAgICBhd2FpdCBleHBlY3QoYXN5bmMgKCkgPT4gYXdhaXQgcmVzdWx0KS5yZWplY3RzLnRvVGhyb3coKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgY3JlYXRlIGV2ZW50IGJyaWRnZSBjb250cm9sbGVyIGZvciB1cGRhdGUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZSA9IHtcbiAgICAgIGlkOiAnZ2FtZUlkJyxcbiAgICB9XG4gICAgY29uc3QgZXZlbnQ6IFBhcnRpYWw8RXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4+ID0ge1xuICAgICAgJ2RldGFpbC10eXBlJzogJ0dBTUVfVVBEQVRFRCcsXG4gICAgICBkZXRhaWw6IGdhbWUsXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsbGVyPGFueSwgeyBnYW1lOiBhbnk7IHR5cGU6IGFueSB9PihHYW1lQ29udHJvbGxlcikoXG4gICAgICBldmVudFxuICAgIClcblxuICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoeyAuLi5nYW1lLCBzdGF0dXM6ICd2YWxpZGF0aW9uJyB9KVxuICAgIGV4cGVjdChyZXN1bHQpLnRvQmVJbnN0YW5jZU9mKEdhbWUpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBjcmVhdGUgZXZlbnQgYnJpZGdlIGNvbnRyb2xsZXIgZm9yIHB1Ymxpc2gnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZSA9IHtcbiAgICAgIGlkOiAnZ2FtZUlkJyxcbiAgICB9XG4gICAgY29uc3QgZXZlbnQ6IFBhcnRpYWw8RXZlbnRCcmlkZ2VFdmVudDxhbnksIGFueT4+ID0ge1xuICAgICAgJ2RldGFpbC10eXBlJzogJ0dBTUVfUFVCTElTSEVEJyxcbiAgICAgIGRldGFpbDogZ2FtZSxcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxsZXI8YW55LCB7IGdhbWU6IGFueTsgdHlwZTogYW55IH0+KEdhbWVDb250cm9sbGVyKShcbiAgICAgIGV2ZW50XG4gICAgKVxuXG4gICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbCh7IC4uLmdhbWUsIHN0YXR1czogJ3B1Ymxpc2hlZCcgfSlcbiAgICBleHBlY3QocmVzdWx0KS50b0JlSW5zdGFuY2VPZihHYW1lKVxuICB9KVxufSlcbiJdfQ==