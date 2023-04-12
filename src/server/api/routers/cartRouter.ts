import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type IViewCartResponse } from "~/lib/validation/cart";
import { TRPCError } from "@trpc/server";
import { addToCartSchema } from "~/lib/validation/cart";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});
import z from "zod";

export const CartRouter = createTRPCRouter({
  view: protectedProcedure.input(z.null()).query(async ({ ctx }) => {
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
          } else if (response.status === 403) {
            //doesnt documented in backend api
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Unauthorized, Please Login",
            });
          } else if (response.status === 422) {
            throw new TRPCError({
              code: "UNPROCESSABLE_CONTENT",
              message: "Unprocessable Content. Please Referesh the page",
            });
          }
        })
        .then((data: IViewCartResponse) => {
          return data;
        });
      return response;
    }),
  edit: protectedProcedure
    .input(addToCartSchema)
    .mutation(async ({ input, ctx }) => {
      const token = ctx.token || "";
      console.log(token);
      const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 403) {
            //doesnt documented in backend api
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Unauthorized, Please Login",
            });
          } else if (response.status === 422) {
            throw new TRPCError({
              code: "UNPROCESSABLE_CONTENT",
              message: "Unprocessable Content. Please Referesh the page",
            });
          }
        })
        .then((data: IViewCartResponse) => {
          return data;
        });
      return response;
    }),
  delete: protectedProcedure
    .input(addToCartSchema)
    .mutation(async ({ input, ctx }) => {
      const token = ctx.token || "";
      console.log(token);
      const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 403) {
            //doesnt documented in backend api
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Unauthorized, Please Login",
            });
          } else if (response.status === 422) {
            throw new TRPCError({
              code: "UNPROCESSABLE_CONTENT",
              message: "Unprocessable Content. Please Referesh the page",
            });
          }
        })
        .then((data: IViewCartResponse) => {
          return data;
        });
      return response;
    }),
  checkout: protectedProcedure
    // .input(addToCartSchema)
    .mutation(async ({ ctx }) => {
      const token = ctx.token || "";
      console.log(token);
      const response = await fetch("https://skillkamp-api.com/v1/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 403) {
            //doesnt documented in backend api
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Unauthorized, Please Login",
            });
          }
        })
        .then((data: IViewCartResponse) => {
          return data;
        });
      const getBaseUrl = () => {
        if (typeof window !== "undefined") return ""; // browser should use relative url
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
        return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
      };
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              currency: "usd",
              unit_amount: Math.round(response.detail.total * 100),
              product_data: {
                name: "HappyKids",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${getBaseUrl()}/cart/success`,
        cancel_url: `${getBaseUrl()}/cart/canceled`,
      });
      return session;
    }),
});
