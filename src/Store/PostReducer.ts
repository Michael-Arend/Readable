import { createSlice } from "@reduxjs/toolkit";
import { ICategory, IPost, IComment } from "../Interfaces";

type PostState = {
  posts: IPost[];
  categories: ICategory[];
  comments: IComment[];
};

const initialState: PostState = { posts: [], categories: [], comments: [] };

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
      state.categories = action.payload.categories;
    },

    setPost(state, action) {
      state.posts = [
        ...state.posts.filter((p) => p.id !== action.payload.id),
        action.payload,
      ];
    },

    votePost(state, action) {
      state.posts = [
        ...state.posts.filter((p) => p.id !== action.payload.post.id),
        {
          ...action.payload.post,
          voteScore:
            action.payload.direction > 0
              ? action.payload.post.voteScore + 1
              : action.payload.post.voteScore - 1,
        },
      ];
    },

    deletePost(state, action) {
      state.posts = [...state.posts.filter((p) => p.id !== action.payload.id)];
    },

    deleteComment(state, action) {
      const post = state.posts.find(
        (x: IPost) => x.id === action.payload.parentId
      );

      if (post === undefined) return;
      post.commentCount--;
      post.comments = post.comments.filter(
        (x: IComment) => x.id !== action.payload.id
      );
    },

    setComment(state, action) {
      const post = state.posts.find(
        (x: IPost) => x.id === action.payload.parentId
      );
      if (post === undefined) return;
      post.comments = post.comments.filter(
        (x: IComment) => x.id !== action.payload.id
      );
      post.comments.push(action.payload);
      post.commentCount = post.comments.length;
    },

    voteComment(state, action) {
      const comment = state.posts
        .find((x: IPost) => x.id === action.payload.comment.parentId)
        ?.comments.find((x: IComment) => x.id === action.payload.comment.id);
      if (comment !== undefined)
        action.payload.direction > 0
          ? comment.voteScore++
          : comment.voteScore--;
    },
  },
});
export const postActions = postSlice.actions;

export default postSlice.reducer;
