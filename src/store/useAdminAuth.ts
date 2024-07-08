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

          const {
            data: { user },
          } = resp.data;

          set(
            {
              data: resp.data,
              isLoading: false,
              isLoggedIn: true,
              isError: null,
              email: user.email,
              password: user.password,
              roles: user?.roles,
              token: resp?.data?.token,
            },
            false,
            "signUp"
          );

          token.set(resp.data.token);

          return resp.data;
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

          console.log(resp.data);

          const {
            data: { user },
          } = resp.data;

          set(
            {
              data: resp.data,
              isLoading: false,
              isLoggedIn: true,
              isError: null,
              email: user.email,
              password: user.password,
              roles: user?.roles,
              token: resp?.data?.token,
            },
            false,
            "signIn"
          );

          token.set(resp.data.token);

          return resp.data;
        } catch (error) {
          set({ isLoading: false, isError: error as Error }, false, "signIn");
          console.log((error as Error).message);
        }
      },

      signOut: async () => {
        try {
          await axios.post("auth/logout");
          token.unset();
        } catch (error) {}
      },
    })),
    { name: "AdminAuth", version: 1 }
  )
);
