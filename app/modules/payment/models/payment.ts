export interface PaymentRequest {
  userId?: string;
  amount: number;
}

export interface PaymentResponse {
  status: string;
  error?: string;
}
