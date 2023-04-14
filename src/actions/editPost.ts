import { API_URL } from "@/config";
import type { Post } from "@/types";

export const editPost = async (
  id: number,
  content: Pick<Post, "title" | "content">
) => {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  const data = await res.json();

  return data as Post;
};
