import { API_URL } from "@/config";
import type { Post } from "@/types";

export const createPost = async (
  post: Pick<Post, "username" | "title" | "content">
) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();

  return data as Post;
};
