import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(5, {
    message: "Name must be at least 5 characters long",
  }),
  description: z.string().min(40, {
    message: "Description must be at least 40 characters long",
  }),
  image: z.optional(z.string()),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),
})

export type zProductSchema = z.infer<typeof ProductSchema>