import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type IViewCartResponse } from "~/lib/validation/cart";
export const CartRouter = createTRPCRouter({
    view: protectedProcedure
    // .input(z.null())
    .query(async ({ ctx }) => {
        const token = ctx.token || '';
        console.log(token)
        const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        }).then((response) => response.json()).then((data: IViewCartResponse ) => {
            return data;
        })
        return response;
    })
});
