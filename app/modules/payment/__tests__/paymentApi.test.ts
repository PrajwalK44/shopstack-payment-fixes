import { POST } from '../api/payment';
import { NextRequest } from 'next/server';
import { processPayment } from '../services/paymentService';

// Mock the processPayment function
jest.mock('../services/paymentService');

const mockProcessPayment = processPayment as jest.MockedFunction<typeof processPayment>;

describe('Payment API', () => {
  beforeEach(() => {
    mockProcessPayment.mockClear();
  });

  it('should return 200 status for successful payment', async () => {
    mockProcessPayment.mockResolvedValue({
      success: true,
      transactionId: 'test_transaction_123'
    });

    const request = {
      json: jest.fn().mockResolvedValue({
        userId: 'user123',
        cardDetails: {
          number: '4111111111111111',
          expiry: '12/25',
          cvv: '123',
          country: 'US'
        },
        amount: 100.00
      })
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('should return 400 status for failed payment', async () => {
    mockProcessPayment.mockResolvedValue({
      success: false,
      error: 'Invalid card details'
    });

    const request = {
      json: jest.fn().mockResolvedValue({
        userId: 'user123',
        cardDetails: {
          number: '4111111111111111',
          expiry: '12/25',
          cvv: '123',
          country: 'US'
        },
        amount: 100.00
      })
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid card details');
  });

  it('should process international card payments', async () => {
    mockProcessPayment.mockResolvedValue({
      success: true,
      transactionId: 'intl_test_123'
    });

    const request = {
      json: jest.fn().mockResolvedValue({
        userId: 'user123',
        cardDetails: {
          number: '4111111111111111',
          expiry: '12/25',
          cvv: '123',
          country: 'CA'
        },
        amount: 100.00
      })
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(mockProcessPayment).toHaveBeenCalledWith(expect.objectContaining({
      cardDetails: expect.objectContaining({
        country: 'CA'
      })
    }));
  });
});