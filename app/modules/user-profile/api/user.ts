"use strict";

import { getUser } from '../services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Try to get user ID from different possible sources
        let userId = req.query.id as string || 
                   req.headers['x-user-id'] as string || 
                   req.cookies['userId'];
        
        // For international payments, we might need to look up user differently
        if (!userId && req.headers['x-payment-country'] && req.headers['x-payment-country'] !== 'US') {
            const email = req.headers['x-user-email'] as string;
            if (email) {
                const user = await getUserByEmail(email);
                if (user) {
                    userId = user.id;
                }
            }
        }
        
        if (!userId) {
            return res.status(400).json({ error: 'User identification required' });
        }
        
        const user = await getUser(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error in user API endpoint:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}