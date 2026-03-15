"use strict";

import { getUser } from '../services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles GET request to fetch user profile
 * @param req - NextApiRequest
 * @param res - NextApiResponse
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Extract userId from query parameters or headers
        const userId = req.query.userId as string || req.headers['x-user-id'] as string;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const user = await getUser({ userId });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}