import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type IViewCartResponse } from "~/lib/validation/cart";
import { TRPCError } from "@trpc/server";
import { addToCartSchema } from "~/lib/validation/cart";
export const CartRouter = createTRPCRouter({
  view: protectedProcedure
    // .input(z.null())
    .query(async ({ ctx }) => {
      const token = ctx.token || "";
      console.log(token);
      const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data: IViewCartResponse) => {
          return data;
        });
      return response;
    }),
  add: protectedProcedure
  .input(addToCartSchema)
  .mutation(async ({ input, ctx }) => {
    const token = ctx.token || "";
    console.log(token);
    const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) { //doesnt documented in backend api
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized, Please Login" });
        } else if (response.status === 422) {
          throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "Unprocessable Content. Please Referesh the page" });
        }
      })
      .then((data: IViewCartResponse) => {
        return data;
      });
    return response;
  }),
});
