import { NextRequest, NextResponse } from "next/server";
import { processPayment } from "../services/paymentService";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = processPayment(body);
  const status = result.error ? 400 : 200;
  return NextResponse.json(result, { status });
}
