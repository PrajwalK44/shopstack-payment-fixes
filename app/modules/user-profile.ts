"use strict";

/**
 * Fetches a user by their unique identifier.
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<User>} The user object.
 * @throws {Error} If the userId is not provided or invalid.
 */
async function getUser(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Valid user ID is required');
    }
    
    // Assuming a database or ORM call to fetch the user
    const user = await db.users.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

module.exports = { getUser };