import { z } from "zod";

export const productDetailMediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  fullUrl: z.string(),
  altText: z.null(),
  thumbnailFullUrl: z.string(),
  mediaType: z.string(),
  index: z.number(),
  title: z.string(),
});

export const productDetailColorSelectionsSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  key: z.string(),
  linkedMediaItems: z.array(
    z.object({
      altText: z.null(),
      url: z.string(),
      fullUrl: z.string(),
      thumbnailFullUrl: z.string(),
      mediaType: z.string(),
      index: z.number(),
      title: z.string(),
    })
  ),
});

export const productDetailSizeSelectionsSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  key: z.string(),
  linkedMediaItems: z.null(),
});

export const productDetailOptionsSchema = z.union([
  z.object({
    // color option
    id: z.string(),
    title: z.string(),
    optionType: z.string(),
    key: z.string(),
    selections: z.array(productDetailColorSelectionsSchema),
  }),
  z.object({
    // size option
    id: z.string(),
    title: z.string(),
    optionType: z.string(),
    key: z.string(),
    selections: z.array(productDetailSizeSelectionsSchema),
  }),
]);

export const productDetailAdditionalInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  index: z.number(),
});

export const productDetailSchema = z.object({
  detail: z.object({
    data: z.object({
      catalog: z.object({
        product: z.object({
          id: z.string(),
          description: z.string(),
          type: z.string(),
          isVisible: z.boolean(),
          sku: z.string(),
          ribbon: z.string(),
          brand: z.null(),
          price: z.number(),
          discountedPrice: z.number(),
          formattedPrice: z.string(),
          formattedDiscountedPrice: z.string(),
          createVersion: z.number(),
          name: z.string(),
          inventory: z.object({ status: z.string(), quantity: z.number() }),
          isInStock: z.boolean(),
          media: z.array(productDetailMediaSchema),
          options: z.array(productDetailOptionsSchema),
          productType: z.string(),
          urlPart: z.string(),
          additionalInfo: z.array(productDetailAdditionalInfoSchema),
        }),
      }),
    }),
  }),
});

export type IProductDetail = z.infer<typeof productDetailSchema>;
export type IProductDetailMedia = z.infer<typeof productDetailMediaSchema>;
export type IProductDetailColorSelections = z.infer<typeof productDetailColorSelectionsSchema>;
export type IProductDetailSizeSelections = z.infer<typeof productDetailSizeSelectionsSchema>;
export type IProductDetailOptions = z.infer<typeof productDetailOptionsSchema>;
export type IProductDetailAdditionalInfo = z.infer<typeof productDetailAdditionalInfoSchema>;
export type IProductDetailInventory = z.infer<typeof productDetailSchema>["detail"]["data"]["catalog"]["product"]["inventory"];