"use strict";

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { getCurrentUser } from '../modules/user-profile';
import { generateToken } from '../utils/jwt';

const router = Router();

/**
 * Login route to authenticate users and return a JWT token.
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Assume `authenticateUser` is a function that validates credentials and returns user ID
        const userId = await authenticateUser(email, password);
        if (!userId) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = generateToken({ id: userId });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

/**
 * Route to fetch the current user's profile.
 */
router.get('/me', authenticate, async (req, res, next) => {
    try {
        // Extract user ID from the request object set by the `authenticate` middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const user = await getCurrentUser(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

export default router;