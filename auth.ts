import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@gmail.com",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          const admin = await Admin.findOne({
            email: String(credentials.email).trim().toLowerCase(),
          });

          if (!admin) {
            console.log("Admin not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            String(credentials.password),
            admin.passwordHash,
          );

          if (!passwordMatch) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: "Admin",
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
