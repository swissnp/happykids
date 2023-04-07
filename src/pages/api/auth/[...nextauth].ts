import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "email@site.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(creds, req){
        const res = await fetch("https://skillkamp-api.com/v1/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: { "Content-Type": "application/json" }
        })
        const user = res.json()
        // If no error and we have user data, return it
        if (res.ok) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.data) {
        session.user = token.data;
      }
      return session;
    },
  },
});
