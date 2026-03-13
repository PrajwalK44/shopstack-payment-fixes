"use strict";

import { getUser } from '../services/userService';
import { Request, Response } from 'express';

/**
 * Handles GET request to fetch user details
 * @param req - Express request object
 * @param res - Express response object
 */
export async function GET(req: Request, res: Response) {
    try {
        // Extract userId from request - adjust based on your auth system
        const userId = req.user?.id || req.query.userId || req.body.userId;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        
        const user = await getUser({ userId });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Failed to fetch user details" });
    }
}