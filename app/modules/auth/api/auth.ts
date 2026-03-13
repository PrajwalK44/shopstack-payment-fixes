import { NextRequest, NextResponse } from "next/server";
import { login } from "../services/authService";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await login(body);
  const status = result.error ? 400 : 200;
  return NextResponse.json(result, { status });
}
