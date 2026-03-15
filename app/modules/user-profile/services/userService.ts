"use strict";

interface User {
    id: string;
    name: string;
    email: string;
    // other user properties
}

interface GetUserParams {
    userId: string;
}

/**
 * Retrieves a user by their ID
 * @param params - Object containing userId
 * @returns Promise<User>
 * @throws Error if userId is not provided
 */
export async function getUser(params: GetUserParams): Promise<User> {
    if (!params?.userId) {
        throw new Error('User ID is required');
    }
    
    // Simulate database call
    const user = await database.getUserById(params.userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    return user;
}

// Mock database for illustration
const database = {
    getUserById: async (id: string) => {
        // Implementation would query the database
        return { id, name: 'Test User', email: 'test@example.com' };
    }
};