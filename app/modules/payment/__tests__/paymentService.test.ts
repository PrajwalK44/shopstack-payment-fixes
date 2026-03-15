import { processPayment } from '../services/paymentService';
import { getUser } from '../../user-profile/services/userService';

// Mock the getUser function
jest.mock('../../user-profile/services/userService');

const mockGetUser = getUser as jest.MockedFunction<typeof getUser>;

describe('processPayment', () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  });

  it('should process US payments successfully', async () => {
    mockGetUser.mockResolvedValue({
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    });

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

  it('should process international payments successfully', async () => {
    mockGetUser.mockResolvedValue({
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    });

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

  it('should handle missing cardDetails gracefully', async () => {
    mockGetUser.mockResolvedValue({
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    });

    const params = {
      userId: 'user123',
      cardDetails: undefined,
      amount: 100.00
    };

    const result = await processPayment(params);

    expect(result.success).toBe(true);
    expect(result.transactionId).toBeDefined();
    expect(result.transactionId).toContain('us_');
  });

  it('should throw error when user does not exist', async () => {
    mockGetUser.mockRejectedValue(new Error('User not found'));

    const params = {
      userId: 'nonexistent',
      cardDetails: {
        number: '4111111111111111',
        expiry: '12/25',
        cvv: '123',
        country: 'US'
      },
      amount: 100.00
    };

    await expect(processPayment(params)).rejects.toThrow('User not found');
  });
});