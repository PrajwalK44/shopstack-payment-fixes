"use strict";

import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();

export const getUser = async (userId: string | undefined): Promise<User | null> => {
    if (!userId || typeof userId !== 'string') {
        console.warn('Invalid or missing user ID provided to getUser');
        return null;
    }
    
    try {
        return await userRepository.findById(userId);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    if (!email || typeof email !== 'string') {
        console.warn('Invalid or missing email provided to getUserByEmail');
        return null;
    }
    
    try {
        return await userRepository.findByEmail(email);
    } catch (error) {
        console.error(`Error fetching user with email ${email}:`, error);
        throw error;
    }
};