export interface WaitlistEntry {
  callsign: string;
  email: string;
  timestamp: string; // ISO 8601 string is usually safest for JSON payloads
  status?: 'pending' | 'notified';
}

// Zod Implementation for later:
// import { z } from 'zod';
// export const WaitlistEntrySchema = z.object({
//   callsign: z.string().min(3).max(10).toUpperCase(),
//   email: z.string().email(),
//   timestamp: z.string().datetime(),
//   status: z.enum(['pending', 'notified']).default('pending'),
// });