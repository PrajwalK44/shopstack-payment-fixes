import { processPayment } from './paymentService';

describe('processPayment', () => {
    describe('International Payment Validation', () => {
        it('should throw error when userId is missing for international payments', async () => {
            const params = {
                userId: '',
                cardDetails: {
                    number: '4111111111111111',
                    expiry: '12/25',
                    cvv: '123',
                    country: 'CA'
                },
                amount: 100.00
            };

            await expect(processPayment(params)).rejects.toThrow('User ID is required');
        });

        it('should process international payment successfully when userId is provided', async () => {
            const params = {
                userId: 'user123',
                cardDetails: {
                    number: '4111111111111111',
                    expiry: '12/25',
                    cvv: '123',
                    country: 'CA'
                },
                amount: 100.00
            };

            const result = await processPayment(params);
            expect(result.success).toBe(true);
            expect(result.transactionId).toBeDefined();
            expect(result.transactionId).toContain('intl_');
        });
    });

    describe('US Payment Validation', () => {
        it('should process US payment successfully when userId is provided', async () => {
            const params = {
                userId: 'user123',
                cardDetails: {
                    number: '4111111111111111',
                    expiry: '12/25',
                    cvv: '123',
                    country: 'US'
                },
                amount: 100.00
            };

            const result = await processPayment(params);
            expect(result.success).toBe(true);
            expect(result.transactionId).toBeDefined();
            expect(result.transactionId).toContain('us_');
        });
    });
});