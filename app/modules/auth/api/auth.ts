"use strict";

import { NextApiRequest, NextApiResponse } from 'next';
import authService from '../services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    try {
        const { username, password } = req.body;
        
        const result = await authService.login({ username, password });
        
        if (!result.success) {
            if (result.errors?.some(e => e.field !== 'general')) {
                return res.status(400).json({
                    success: false,
                    errors: result.errors
                });
            }
            return res.status(401).json({
                success: false,
                errors: result.errors
            });
        }
        
        return res.status(200).json({
            success: true,
            token: result.token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            errors: [{
                field: 'server',
                message: 'An unexpected error occurred'
            }]
        });
    }
}