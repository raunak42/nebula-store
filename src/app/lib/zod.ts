import { z } from "zod"

export const emailInput = z.string().email().min(6).max(100);
export const passwordInput = z.string().min(5).max(30);
