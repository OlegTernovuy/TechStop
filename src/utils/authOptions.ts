import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    //   // authorization: `${process.env.NEXT_PUBLIC_BASE_URL}/api/google`,
    // }),
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
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
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
