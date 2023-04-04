import { z } from "zod"

export const productDetailschema = z.object({
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
          media: z.array(
            z.object({
              id: z.string(),
              url: z.string(),
              fullUrl: z.string(),
              altText: z.null(),
              thumbnailFullUrl: z.string(),
              mediaType: z.string(),
              index: z.number(),
              title: z.string()
            })
          ),
          options: z.array(
            z.union([
              z.object({
                id: z.string(),
                title: z.string(),
                optionType: z.string(),
                key: z.string(),
                selections: z.array(
                  z.object({
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
                        title: z.string()
                      })
                    )
                  })
                )
              }),
              z.object({
                id: z.string(),
                title: z.string(),
                optionType: z.string(),
                key: z.string(),
                selections: z.array(
                  z.object({
                    id: z.number(),
                    value: z.string(),
                    description: z.string(),
                    key: z.string(),
                    linkedMediaItems: z.null()
                  })
                )
              })
            ])
          ),
          productType: z.string(),
          urlPart: z.string(),
          additionalInfo: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              index: z.number()
            })
          )
        })
      })
    })
  })
})
export type IProductDetail = z.infer<typeof productDetailschema>