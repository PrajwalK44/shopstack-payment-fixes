"use strict";

interface User {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}

/**
 * Retrieves a user by their ID
 * @param userId - The unique identifier for the user
 * @returns Promise<User> - The user object
 * @throws Error - If userId is not provided or user is not found
 */
export async function getUser(userId: string): Promise<User> {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Valid user ID is required');
    }
    
    // In a real implementation, this would fetch from a database
    // For example:
    // const user = await UserModel.findById(userId);
    // if (!user) {
    //     throw new Error('User not found');
    // }
    // return user;
    
    // Mock implementation for demonstration
    return {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com'
    };
}

// Add utility function for debugging
export function validateUserId(userId: unknown): userId is string {
    return typeof userId === 'string' && userId.trim() !== '';
}