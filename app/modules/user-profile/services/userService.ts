import { User } from "../models/user";

export function getUser(id: string): User {
  if (!id) {
    throw new Error("ID required");
  }
  return { id, name: "John Doe", email: "john@example.com" };
}
