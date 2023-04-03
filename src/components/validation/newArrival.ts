import * as z from "zod";
const newArrivalScemaList = z.object({
  id: z.string(),
  options: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
    })
  ),
  ribbon: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  sku: z.string(),
  isInStock: z.boolean(),
  urlPart: z.string(),
  formattedDiscountedPrice: z.string(),
  formattedPrice: z.string(),
  name: z.string(),
  media: z.array(
    z.object({
      url: z.string(),
      index: z.number(),
      mediaType: z.string(),
      altText : z.string().or(z.null()),
      title: z.string(),
    })
  ),
  inventory : z.object({
      status : z.string(),
      quantity : z.number()
  })
})
const newArrivalScema = z.object({
  detail: z.object({
    data: z.object({
      catalog: z.object({
        category: z.object({
          numOfProducts: z.number(),
          productsWithMetaData: z.object({
            totalcount: z.number(),
            list: z.array(
              newArrivalScemaList
            ),
          }),
        }),
      }),
    }),
  }),
});
// make a proper schema in your docs pls
export type INewArrivalScema = z.infer<typeof newArrivalScema>;
export type INewArrivalScemaList= z.infer<typeof newArrivalScemaList>;