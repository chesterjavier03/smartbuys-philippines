import * as z from "zod"

export const CreateOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  paymentIntentId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
})
