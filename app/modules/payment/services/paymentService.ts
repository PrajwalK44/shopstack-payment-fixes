import { PaymentRequest, PaymentResponse } from "../models/payment";

export function processPayment(req: PaymentRequest): PaymentResponse {
  if (!req.userId) {
    // Dummy error for LLM fix later
    return { status: "failed", error: "Missing userId" };
  }
  return { status: "success" };
}
