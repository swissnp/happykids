import { z } from "zod";

export const filterRes = z.object({
  data: z.object({
    catalog: z.object({
      filters: z.array(
        z.object({
          filterType: z.enum([
            "CATEGORY",
            "PRICE",
            "OPTION_COLOR",
            "OPTION_LIST",
          ]),
          name: z.enum(["categoryId", "price", "Color", "Size"]),
          field: z.enum([
            "categoryId",
            "comparePrice",
            "options.Color",
            "options.Size",
          ]),
          values: z.array(z.object({ key: z.string(), value: z.string() })),
        })
      ),
    }),
  }),
});

export type IFilterRes = z.infer<typeof filterRes>;
