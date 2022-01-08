import { createSlice } from "@reduxjs/toolkit";
import { idText } from "typescript";
import { ICategory, IPost } from "../Interfaces";

type PostState = {
  posts: IPost[];
  categories: ICategory[];
};

const initialState: PostState = { posts: [], categories: [] };

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = [
        ...state.posts.filter(
          (p) => action.payload.find((x: IPost) => x.id === p.id) === undefined
        ),
        ...action.payload,
      ];
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },

    setPost(state, action) {
      state.posts = [
        ...state.posts.filter((p) => p.id !== action.payload.id),
        action.payload,
      ];
    },
  },
});
export const postActions = postSlice.actions;

export default postSlice.reducer;
