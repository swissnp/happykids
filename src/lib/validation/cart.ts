import * as z from "zod";
// import { Option } from "react-tailwindcss-select/dist/components/type";

export const addToCartSchema = z.object({
    sku: z.string(),
    name: z.string(),
    price: z.number(),
    discountedPrice: z.number(),
    color: z.string(),
    size: z.string(),
    qty: z.number(),
})

export const itemFormSchema = z.object({
  color: z.string(),
  size: z.string(),
  qty: z.number().optional(),
});

// const sizeSchema = z.instanceof(Option)

export const CartItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  color: z.string(),
  size: z.string(),
  qty: z.number(),
  fullUrl: z.string()
})

export const viewCartResponseSchema = z.object({
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
export type IItemForm = z.infer<typeof itemFormSchema>;