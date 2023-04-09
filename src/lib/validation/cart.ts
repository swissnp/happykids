import * as z from "zod";

const addToCartSchema = z.object({
    sku: z.string(),
    name: z.string(),
    price: z.number(),
    discountedPrice: z.number(),
    color: z.string(),
    size: z.string(),
    qty: z.number(),
})

const CartItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  color: z.string(),
  size: z.string(),
  qty: z.number(),
  fullUrl: z.string()
})

const viewCartResponseSchema = z.object({
  detail: z.object({
    total: z.number(),
    shipping: z.number(),
    sub_total: z.number(),
    cart_list: z.array(
     CartItemSchema
    )
  })
})

export type IAddToCart = z.infer<typeof addToCartSchema>;
export type IViewCartResponse = z.infer<typeof viewCartResponseSchema>;
export type ICartItem = z.infer<typeof CartItemSchema>;
