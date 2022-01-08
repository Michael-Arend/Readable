import { useFetchCategories } from "../DataAccess/Category";
import {
  useFetchPosts,
  useFetchOnePost,
  useFetchPostsByCategory,
} from "../DataAccess/Post";
import { postActions } from "./PostReducer";

export const useFetchAllPosts = () => {
  const fetchPosts = useFetchPosts();
  return async (dispatch: (action: any) => void) => {
    const posts = await fetchPosts();
    dispatch(postActions.setPosts(posts));
  };
};

export const useFetchPost = (id: string) => {
  const fetchPost = useFetchOnePost(id);
  return async (dispatch: (action: any) => void) => {
    const post = await fetchPost();
    dispatch(postActions.setPost(post));
  };
};

export const useFetchAllCategories = () => {
  const fetchCategories = useFetchCategories();

  return async (dispatch: (action: any) => void) => {
    const categories = await fetchCategories();
    dispatch(postActions.setCategories(categories));
  };
};

export const useFetchCategory = (name: string) => {
  const fetchPostsByCategory = useFetchPostsByCategory(name);

  return async (dispatch: (action: any) => void) => {
    const posts = await fetchPostsByCategory();
    dispatch(postActions.setPost(posts));
  };
};
