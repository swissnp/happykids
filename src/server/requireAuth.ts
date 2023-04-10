import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/login", // login path
          permanent: false,
        },
        // message: "Unauthorize, Please login first.",
      };
    }

    return await func(ctx);
  };