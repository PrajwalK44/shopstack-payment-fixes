import { getUser } from './userService';

describe('getUser', () => {
    describe('User ID Validation', () => {
        it('should throw error when userId is missing', async () => {
            await expect(getUser({ userId: '' })).rejects.toThrow('User ID is required');
        });

        it('should throw error when userId is undefined', async () => {
            await expect(getUser({ userId: undefined } as any)).rejects.toThrow('User ID is required');
        });

        it('should throw error when params is undefined', async () => {
            await expect(getUser(undefined as any)).rejects.toThrow('User ID is required');
        });

        it('should retrieve user successfully when userId is provided', async () => {
            const user = await getUser({ userId: 'user123' });
            expect(user).toBeDefined();
            expect(user.id).toBe('user123');
            expect(user.name).toBe('Test User');
            expect(user.email).toBe('test@example.com');
        });
    });
});