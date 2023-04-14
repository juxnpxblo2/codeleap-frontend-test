import { atom } from "jotai";

export const userAtom = atom<string | null>(
  localStorage.getItem("user") || null
);
