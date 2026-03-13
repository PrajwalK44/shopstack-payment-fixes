import { AuthRequest, AuthResponse } from "../models/auth";

export function login(req: AuthRequest): AuthResponse {
  if (!req.username || !req.password) {
    // Dummy error for LLM to fix
    return { error: "Missing fields" };
  }
  return { token: "dummy-jwt-token" };
}
