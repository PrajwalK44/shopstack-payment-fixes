"use strict";

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

/**
 * Middleware to authenticate requests using JWT.
 * @throws {Error} If the token is invalid or missing.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication token required' });
        }
        
        const payload = verifyToken(token);
        if (!payload?.id) {
            return res.status(403).json({ error: 'Invalid token: User ID missing' });
        }
        
        // Attach the user ID to the request object
        req.user = { id: payload.id };
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}