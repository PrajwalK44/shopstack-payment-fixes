export interface PaymentRequest {
  userId?: string;
  amount: number;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    country: string;
  };
}

export interface PaymentResponse {
  status: string;
  error?: string;
}
