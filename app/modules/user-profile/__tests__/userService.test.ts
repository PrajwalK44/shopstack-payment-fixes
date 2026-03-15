import { getUser } from '../services/userService';

describe('getUser', () => {
    it('should retrieve user successfully when userId is provided', async () => {
        const params = { userId: 'user123' };
        const user = await getUser(params);
        expect(user).toBeDefined();
        expect(user.id).toBe('user123');
        expect(user.name).toBe('Test User');
        expect(user.email).toBe('test@example.com');
    });

    it('should throw error when userId is not provided', async () => {
        const params = { userId: '' };
        await expect(getUser(params)).rejects.toThrow('User ID is required');
    });

    it('should throw error when userId is undefined', async () => {
        const params = { userId: undefined };
        await expect(getUser(params)).rejects.toThrow('User ID is required');
    });

    it('should throw error when params is undefined', async () => {
        await expect(getUser(undefined)).rejects.toThrow('User ID is required');
    });
});