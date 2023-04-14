import { API_URL } from "@/config";

export const deletePost = async (id: number) => {
  await fetch(`${API_URL}/${id}/`, {
    method: "DELETE",
  });

  return id;
};
