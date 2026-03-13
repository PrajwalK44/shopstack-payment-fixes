"use strict";

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

interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

/**
 * Processes a payment
 * @param params - Payment parameters including userId and card details
 * @throws {Error} If required parameters are missing
 */
export async function processPayment(params: PaymentParams): Promise<PaymentResult> {
    // Validate required parameters
    if (!params?.userId) {
        throw new Error("User ID is required for payment processing");
    }
    
    if (!params?.cardDetails) {
        throw new Error("Card details are required");
    }
    
    try {
        // Determine if this is an international card
        const isInternational = params.cardDetails.country !== 'US';
        
        // Common payment processing logic
        if (isInternational) {
            // International card processing path
            // Ensure userId is passed to any subsequent service calls
            const user = await getUserProfile(params.userId);
            
            // Process international payment
            return await processInternationalPayment(params);
        } else {
            // Domestic card processing path
            return await processDomesticPayment(params);
        }
    } catch (error) {
        console.error("Payment processing failed:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown payment error"
        };
    }
}

// Helper functions (mock implementations - replace with actual implementations)
async function getUserProfile(userId: string) {
    // Implementation to get user profile
    return { id: userId, name: "User" };
}

async function processInternationalPayment(params: PaymentParams) {
    // International payment processing logic
    return { success: true, transactionId: "intl_" + Math.random().toString(36).substr(2, 9) };
}

async function processDomesticPayment(params: PaymentParams) {
    // Domestic payment processing logic
    return { success: true, transactionId: "dom_" + Math.random().toString(36).substr(2, 9) };
}