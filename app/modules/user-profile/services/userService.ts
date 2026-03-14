"use strict";

import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';
import { logger } from '../../../shared/logger';

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUser(userId?: string): Promise<User | null> {
        if (!userId) {
            logger.warn('getUser called without userId - possible guest checkout');
            return null;
        }

        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                logger.error(`User not found for ID: ${userId}`);
                return null;
            }
            return user;
        } catch (error) {
            logger.error(`Error fetching user ${userId}:`, error);
            throw new Error('Failed to retrieve user information');
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findByEmail(email);
        } catch (error) {
            logger.error(`Error fetching user by email ${email}:`, error);
            throw new Error('Failed to retrieve user information');
        }
    }
}

export const userService = new UserService();