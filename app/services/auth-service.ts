"use strict";

import { getUser } from '../modules/user-profile';
import { validateUserId } from '../modules/user-profile';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

class AuthService {
    /**
     * Authenticates a user and returns a token with user data
     * @param credentials - User login credentials
     * @returns Promise<AuthResponse> - Authentication response
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // In a real implementation, this would verify credentials against a database
        // For example:
        // const user = await UserModel.findOne({ email: credentials.email });
        // if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
        //     throw new Error('Invalid credentials');
        // }
        
        // Mock implementation for demonstration
        const mockUser = {
            id: 'user_123',
            name: 'John Doe',
            email: credentials.email
        };
        
        // Generate a mock token (in real implementation, use JWT or similar)
        const mockToken = 'mock.jwt.token';
        
        return {
            token: mockToken,
            user: mockUser
        };
    }
    
    /**
     * Retrieves the full user profile after authentication
     * @param userId - The user ID from the token or session
     * @returns Promise<User> - The full user profile
     */
    async getAuthenticatedUser(userId: unknown): Promise<ReturnType<typeof getUser>> {
        if (!validateUserId(userId)) {
            throw new Error('Authentication failed: Invalid user ID');
        }
        
        return getUser(userId);
    }
}

export default new AuthService();