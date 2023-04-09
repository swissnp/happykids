import * as z from "zod";
const newArrivalSchemaMedia = z.object({
  url: z.string(),
  index: z.number(),
  mediaType: z.string(),
  altText: z.string().or(z.null()),
  title: z.string(),
});

const newArrivalSchemaList = z.object({
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
  media: z.array(newArrivalSchemaMedia),
  inventory: z.object({
    status: z.string(),
    quantity: z.number(),
  }),
});

const newArrivalSchema = z.object({
  detail: z.object({
    data: z.object({
      catalog: z.object({
        category: z.object({
          numOfProducts: z.number(),
          productsWithMetaData: z.object({
            totalcount: z.number(),
            list: z.array(newArrivalSchemaList),
          }),
        }),
      }),
    }),
  }),
});

// make a proper schema in your docs pls
export type INewArrivalSchema = z.infer<typeof newArrivalSchema>;
export type INewArrivalSchemaList = z.infer<typeof newArrivalSchemaList>;
export type INewArrivalSchemaMedia = z.infer<typeof newArrivalSchemaMedia>;
