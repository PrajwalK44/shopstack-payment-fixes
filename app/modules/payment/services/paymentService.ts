"use strict";

import { getUser } from '../../user-profile/services/userService';

interface PaymentParams {
    userId: string;
    cardDetails: {
        number: string;
        expiry: string;
        cvv: string;
        country: string;
    };
    amount: number;
}

/**
 * Processes payment for a user
 * @param params - Payment parameters
 * @returns Promise<{ success: boolean, transactionId?: string }>
 */
export async function processPayment(params: PaymentParams) {
    try {
        // Validate user exists before processing payment
        const user = await getUser({ userId: params.userId });
        
        // Process payment based on card country
        if (params.cardDetails.country !== 'US') {
            return await processInternationalPayment(params);
        }
        
        return await processUSPayment(params);
    } catch (error) {
        console.error('Payment processing failed:', error);
        throw error;
    }
}

async function processUSPayment(params: PaymentParams) {
    // US payment processing logic
    return { success: true, transactionId: 'us_' + Date.now() };
}

async function processInternationalPayment(params: PaymentParams) {
    // International payment processing logic
    // Ensure all parameters are properly passed through
    if (!params.userId) {
        throw new Error('User ID is required for international payments');
    }
    
    return { success: true, transactionId: 'intl_' + Date.now() };
}