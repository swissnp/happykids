import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type User,
} from "next-auth";
import { type JWT } from "next-auth/jwt";
import { type IResponseLogin } from "~/lib/validation/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TRPCError } from "@trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Custom",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@test.pl" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const payload = await fetch(
          "https://skillkamp-api.com/v1/api/auth/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 401) {
              throw new TRPCError({ code: "UNAUTHORIZED" });
            } else if (response.status === 422) {
              throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
            }
          })
          .then((data: IResponseLogin) => {
            return data;
          })
          .catch((error) => {
            console.log(error);
          });

        if (payload) {
          return {
            id: payload.detail.Name, // NextAuth requires `id` field
            name: payload.detail.Name,
            access_token: payload.detail.Token, // <-- retrive JWT token from external API response
          };
        } else return null;
      },
    }),
  ],
  jwt: {
    secret: "super-secret",
    maxAge: 1 * 30 * 60, // 15 days
  },
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        token.account = {
          ...user,
          access_token: user.access_token, // <-- add token to JWT (Next's) object
        };
      }
      return token;
    },
    session: ({ session }) => {
      return { ...session };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
