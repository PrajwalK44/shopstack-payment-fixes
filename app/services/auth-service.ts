"use strict";

const jwt = require('jsonwebtoken');
const { getUser } = require('../modules/user-profile');

/**
 * Authenticates a user and returns a JWT token.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<string>} JWT token.
 */
async function login(email, password) {
    // Validate credentials (pseudo-code)
    const user = await db.users.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    
    // Generate JWT token with userId
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

/**
 * Validates a JWT token and fetches the associated user.
 * @param {string} token - JWT token.
 * @returns {Promise<User>} The user object.
 */
async function validateToken(token) {
    if (!token) {
        throw new Error('Authentication token is required');
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId) {
            throw new Error('Invalid token: userId missing');
        }
        return await getUser(decoded.userId);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = { login, validateToken };