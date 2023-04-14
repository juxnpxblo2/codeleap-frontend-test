import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Post } from "@/types";

export interface PostsState {
  fetched: boolean;
  list: Post[];
}

const initialState: PostsState = {
  fetched: false,
  list: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsFetched: (state, action: PayloadAction<Post[]>) => {
      state.fetched = true;
      state.list = action.payload;
    },
    postCreated: (state, action: PayloadAction<Post>) => {
      state.list.unshift(action.payload);
    },
    postDeleted: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((post) => post.id !== action.payload);
    },
    postEdited: (
      state,
      action: PayloadAction<{
        id: number;
        newPost: Post;
      }>
    ) => {
      const { id, newPost } = action.payload;

      state.list = state.list.map((post) => {
        if (post.id === id) {
          return newPost;
        }

        return post;
      });
    },
  },
});

export const { postsFetched, postCreated, postDeleted, postEdited } =
  postsSlice.actions;

export default postsSlice.reducer;
