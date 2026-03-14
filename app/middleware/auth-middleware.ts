"use strict";

const { validateToken } = require('../services/auth-service');

/**
 * Middleware to authenticate requests using JWT.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication token is required' });
        }
        
        const user = await validateToken(token);
        req.user = user; // Attach user to the request
        next();
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }
}

module.exports = { authenticate };