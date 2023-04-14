import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { userAtom } from "@/atoms";

export const useLogout = () => {
  const setUser = useSetAtom(userAtom);

  return useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, [setUser]);
};
