import { Stats } from "../models/stats";

export function getStats(): Stats {
  // Dummy implementation returning mock stats
  return { totalUsers: 145, totalPayments: 342 };
}
