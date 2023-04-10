import type { AdapterUser, User } from "next-auth/adapters";

declare module "next-auth" {
  interface User extends AdapterUser {
    access_token?: string;
  }

}
declare module "next-auth/jwt" {
    interface JWT {
        account: account
    }
    interface account extends User{
        access_token?: string;
    }
  }
