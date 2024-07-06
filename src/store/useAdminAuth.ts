import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { env } from "../../next.config";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const { NEXT_PUBLIC_BASE_URL } = env;

axios.defaults.baseURL = NEXT_PUBLIC_BASE_URL;

interface IAuthStore {
  email: null | string;
  roles: string[];
  password: null | string;
  token: null | string;
  isLoggedIn: boolean;
  isRefresh: boolean;
  error: null | Error;
  signUp: (email: null | string, password: null | string) => void;
  signIn: (email: null | string, password: null | string) => void;
  signOut: () => void;
}

const initialState = {
  email: "",
  roles: [""],
  password: "",
  token: "",
  isLoggedIn: false,
  isRefresh: false,
  error: null,
};

export const useAdminAuth = create<IAuthStore>()(
  devtools((set, get) => ({
    ...initialState,

    signIn: () => {
      const { email, password } = get();
    },
    signUp: () => {},
    signOut: () => {},
  }))
);
