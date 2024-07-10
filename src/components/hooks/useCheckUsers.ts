import { useSession } from "next-auth/react";

export const useCheckUsers = (query: string) => {
  const { data } = useSession();

  const isUser = data?.user?.roles?.find((item) => item === query);

  return { isUser };
};
