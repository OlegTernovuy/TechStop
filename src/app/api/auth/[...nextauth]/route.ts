import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(BASE_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          try {
            const user = await res.json();
            return user.data;
          } catch (error) {
            console.error("Error parsing response:", error);
            return null;
          }
        } else {
          try {
            const errorResponse = await res.json();
            return { error: errorResponse.message };
          } catch (error) {
            console.error("Error parsing error response:", error);
          }
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (user?.error) throw new Error(user?.error);

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // return { ...token, ...user };
        token.user = user;
        token.token = token.token;
      }
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      session.token = token.token;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
