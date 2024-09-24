import { z } from "zod"

export const patientFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  age: z.number().optional(),
  address: z.string().optional()
});
