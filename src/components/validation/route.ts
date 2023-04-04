import * as z from "zod";
export const skuSchema = z.string().regex(/^0000[1-9]|0001[0-2]$/); // 00001 - 00012

export type ISku = z.infer<typeof skuSchema>;