import { z } from "zod";

export const createTruckDriverSchema = z.object({
    name: z.string(),
    plate: z.string(),
})