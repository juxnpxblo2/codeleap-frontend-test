import { API_URL } from "@/config";
import type { Post } from "@/types";

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export const fetchPosts = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data as Response;
};
