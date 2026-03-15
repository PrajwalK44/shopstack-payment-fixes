import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../api/user';

describe('User API', () => {
    it('should return user profile when userId is provided in query', async () => {
        const mockReq = {
            query: { userId: 'user123' },
            headers: {}
        } as unknown as NextApiRequest;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as NextApiResponse;

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            id: 'user123',
            name: 'Test User',
            email: 'test@example.com'
        }));
    });

    it('should return user profile when userId is provided in headers', async () => {
        const mockReq = {
            query: {},
            headers: { 'x-user-id': 'user456' }
        } as unknown as NextApiRequest;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as NextApiResponse;

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            id: 'user456',
            name: 'Test User',
            email: 'test@example.com'
        }));
    });

    it('should return 400 error when userId is not provided', async () => {
        const mockReq = {
            query: {},
            headers: {}
        } as unknown as NextApiRequest;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as NextApiResponse;

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'User ID is required' });
    });
});