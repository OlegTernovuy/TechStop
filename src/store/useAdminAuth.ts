import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { env } from "../../next.config";
import { IUser } from "@/components/admin/types";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

// const { NEXT_PUBLIC_BASE_URL } = process.env;
const { NEXT_PUBLIC_BASE_URL } = env;

axios.defaults.baseURL = NEXT_PUBLIC_BASE_URL;

interface IAuthStore {
  data: {};
  email: null | string;
  roles: string[];
  password: null | string;
  token: null | string;
  isLoggedIn: boolean;
  isLoading?: boolean;
  isError?: null | Error;
  error: null | Error;
  signUp: (
    email: null | string,
    password: null | string
  ) => Promise<IUser | null>;
  signIn: (
    email: null | string,
    password: null | string
  ) => Promise<IUser | null>;
  signOut: () => Promise<void>;
}

const initialState = {
  data: {},
  email: "",
  roles: [""],
  password: "",
  token: "",
  isLoading: false,
  isError: null,
  isLoggedIn: false,
  error: null,
};

export const useAdminAuth = create<IAuthStore>()(
  persist(
    devtools((set, get) => ({
      ...initialState,
      signUp: async (email, password) => {
        try {
          set({ isLoading: true, isError: null }, false, "signUp");

          const resp = await axios.post("auth/register", { email, password });

          if (resp?.status === 409) {
            alert("Conflict, E-mail in use");
            throw new Error("Conflict, E-mail in use");
          }

          if (resp.status !== 201) {
            throw new Error("Something went wrong");
          }

          const { data } = resp.data;

          set(
            {
              data: resp.data,
              isLoading: false,
              isLoggedIn: true,
              isError: null,
              email: data.user.email,
              password: data.user.password,
              roles: data?.user.roles,
              token: data?.token,
            },
            false,
            "signUp"
          );

          token.set(data.token);

          return data;
        } catch (error) {
          set({ isLoading: false, isError: error as Error }, false, "signUp");
          console.log((error as Error).message);
        }
      },
      signIn: async (email, password) => {
        try {
          set({ isLoading: true, isError: null }, false, "signIn");

          const resp = await axios.post("auth/login", { email, password });

          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }

          const { data } = resp.data;

          set(
            {
              data: resp.data.data,
              isLoading: false,
              isLoggedIn: true,
              isError: null,
              email: data?.user.email,
              password: data?.user.password,
              roles: data?.user?.roles,
              token: data?.token,
            },
            false,
            "signIn"
          );

          token.set(data?.token);

          return data;
        } catch (error) {
          set({ isLoading: false, isError: error as Error }, false, "signIn");
          console.log((error as Error).message);
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, isError: null }, false, "signOut");

          const resp = await axios.post("auth/logout");

          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }

          token.unset();

          const { data } = resp.data;

          set(
            {
              data: {},
              isLoading: false,
              isError: null,
              isLoggedIn: false,
              email: null,
              password: null,
              roles: [""],
              token: "",
            },
            false,
            "signOut"
          );

          return data;
        } catch (error) {
          console.log((error as Error).message);
          set({ isLoading: false, isError: error as Error }, false, "signOut");
        }
      },
    })),
    { name: "AdminAuth", version: 1 }
  )
);
