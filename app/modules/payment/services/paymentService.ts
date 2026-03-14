"use strict";

import { PaymentRepository } from '../repositories/paymentRepository';
import { userService } from '../../user-profile/services/userService';
import { logger } from '../../../shared/logger';
import { PaymentRequest } from '../types/payment';
import { detectCardType } from '../utils/cardUtils';

class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async processPayment(paymentRequest: PaymentRequest, userId?: string) {
        try {
            logger.info(`Processing payment for ${userId ? 'user' : 'guest'}`, {
                amount: paymentRequest.amount,
                currency: paymentRequest.currency,
                cardType: detectCardType(paymentRequest.cardNumber)
            });
            
            // Handle user data based on whether we have a user ID
            let user = null;
            if (userId) {
                user = await userService.getUser(userId);
                if (!user) {
                    logger.warn(`User not found for ID: ${userId}, processing as guest`);
                }
            }
            
            // Additional validation for international payments
            if (paymentRequest.currency !== 'USD') {
                logger.info('Processing international payment', {
                    currency: paymentRequest.currency
                });
                
                // Add any additional international payment validations here
                if (!this.validateInternationalPayment(paymentRequest)) {
                    throw new Error('Invalid payment details for international transaction');
                }
            }
            
            // Process the payment
            const paymentResult = await this.paymentRepository.createPayment({
                ...paymentRequest,
                userId: userId || undefined,
                status: 'pending'
            });
            
            // Additional processing logic would go here
            
            return paymentResult;
        } catch (error) {
            logger.error('Payment processing failed:', error);
            throw new Error(`Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    
    private validateInternationalPayment(paymentRequest: PaymentRequest): boolean {
        // Implement country-specific validation logic
        // For example, check if the card type is supported in the target country
        const cardType = detectCardType(paymentRequest.cardNumber);
        
        // Add any additional validation rules for international payments
        return true; // Simplified for example
    }
}

export const paymentService = new PaymentService();