import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { userAtom } from "@/atoms";

export const useLogin = () => {
  const setUser = useSetAtom(userAtom);

  return useCallback(
    (user: string) => {
      setUser(user);
      localStorage.setItem("user", user);
    },
    [setUser]
  );
};
