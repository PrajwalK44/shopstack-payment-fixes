"use strict";

import { getUser } from '../../user-profile/services/userService';
import { PaymentRepository } from '../repositories/paymentRepository';
import { Payment } from '../models/payment';

const paymentRepository = new PaymentRepository();

export const processPayment = async (paymentData: any, requestContext: any): Promise<Payment> => {
    try {
        // Extract user identification from request context
        let userId = requestContext.userId || 
                   requestContext.headers?.['x-user-id'] || 
                   requestContext.cookies?.['userId'];
        
        // For non-US payments, we might need to handle user identification differently
        if (!userId && requestContext.headers?.['x-payment-country'] !== 'US') {
            const email = requestContext.headers?.['x-user-email'];
            if (email) {
                const user = await getUserByEmail(email);
                if (user) {
                    userId = user.id;
                }
            }
        }
        
        if (!userId) {
            throw new Error('User identification required for payment processing');
        }
        
        // Verify user exists
        const user = await getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        // Process payment with validated user
        const payment = await paymentRepository.create({
            ...paymentData,
            userId,
            status: 'pending'
        });
        
        // Additional payment processing logic...
        
        return payment;
    } catch (error) {
        console.error('Payment processing error:', error);
        throw error;
    }
};

// Helper function for email-based user lookup
const getUserByEmail = async (email: string) => {
    const { getUserByEmail } = await import('../../user-profile/services/userService');
    return getUserByEmail(email);
};