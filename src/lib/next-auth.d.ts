import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    error?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    b_day?: string;
    address?: {
      city?: string;
      postalOperator?: string;
      postalDepartment?: string;
      personalAddress?: {
        street?: string;
        house?: string;
        apartament?: number;
      };
    };
  }

  interface Session {
    user: User;
    token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    token: string;
  }
}
