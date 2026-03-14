"use strict";

import { Request, Response } from 'express';
import authService from '../services/auth-service';

class AuthController {
    /**
     * Handles user login
     * @param req - Express request object
     * @param res - Express response object
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }
            
            const authResponse = await authService.login({ email, password });
            
            // Set the token in a cookie or return it in the response
            res.status(200).json({
                success: true,
                token: authResponse.token,
                user: authResponse.user
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed'
            });
        }
    }
    
    /**
     * Retrieves the authenticated user's profile
     * @param req - Express request object
     * @param res - Express response object
     */
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            // Extract user ID from the authenticated request
            // This could come from:
            // 1. JWT token (req.user.id after middleware)
            // 2. Session (req.session.userId)
            // 3. Request params (req.params.id)
            
            // For this example, we'll assume it's set by authentication middleware
            const userId = req.user?.id;
            
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized: No user ID found' });
                return;
            }
            
            const user = await authService.getAuthenticatedUser(userId);
            
            res.status(200).json({
                success: true,
                user
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to retrieve user profile'
            });
        }
    }
}

export default new AuthController();