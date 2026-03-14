"use strict";

import { User } from '../models/user';
import { UserRepository } from '../repositories/user-repository';

const userRepository = new UserRepository();

/**
 * Fetches a user by their ID.
 * @param {string} id - The user ID.
 * @returns {Promise<User | null>} The user object or null if not found.
 * @throws {Error} If the ID is not provided or invalid.
 */
export async function getUser(id: string | undefined): Promise<User | null> {
    if (!id || typeof id !== 'string') {
        throw new Error('Valid user ID is required');
    }
    
    return await userRepository.findById(id);
}

/**
 * Fetches the current authenticated user.
 * @param {string | undefined} id - The user ID from the authentication context.
 * @returns {Promise<User>} The user object.
 * @throws {Error} If the user ID is missing or the user is not found.
 */
export async function getCurrentUser(id: string | undefined): Promise<User> {
    if (!id) {
        throw new Error('Authentication required: No user ID provided');
    }
    
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    
    return user;
}