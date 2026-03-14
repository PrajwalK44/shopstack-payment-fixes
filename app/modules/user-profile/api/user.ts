"use strict";

import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../services/userService';
import { logger } from '../../../shared/logger';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });
        let userId = req.query.userId as string || session?.user?.id;
        
        // Handle guest checkout scenario
        if (!userId) {
            logger.info('Handling guest checkout request');
            return res.status(200).json({
                isGuest: true,
                message: 'Guest checkout enabled'
            });
        }
        
        const user = await userService.getUser(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        logger.error('Error in user API:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export default handler;