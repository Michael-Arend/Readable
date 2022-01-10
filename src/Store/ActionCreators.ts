import { useFetchCategories } from "../DataAccess/Category";
import {
  useFetchPosts,
  useFetchOnePost,
  useFetchPostsByCategory,
  PostNewPost,
  UpdateVoteForPost,
  DeletePost,
  PostComment,
  UpdateVoteForComment,
  DeleteComment,
  EditComment,
  EditPost,
} from "../DataAccess/Post";
import { IPost, IComment } from "../Interfaces";
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

export const CreateNewPost = (post: IPost) => {
  post.id = Math.random().toString().substring(2, 12);
  post.timestamp = Date.now();
  return async (dispatch: (action: any) => void) => {
    await PostNewPost(post)();
    dispatch(postActions.setPost(post));
  };
};

export const VoteForPost = (post: IPost, direction: number) => {
  return async (dispatch: (action: any) => void) => {
    await UpdateVoteForPost(post, direction)();
    dispatch(postActions.votePost({ post: post, direction: direction }));
  };
};

export const RemovePost = (post: IPost) => {
  return async (dispatch: (action: any) => void) => {
    DeletePost(post);

    dispatch(postActions.deletePost(post));
  };
};

export const RemoveComment = (comment: IComment) => {
  return async (dispatch: (action: any) => void) => {
    await DeleteComment(comment);
    dispatch(postActions.deleteComment(comment));
  };
};

export const CreateNewComment = (comment: IComment) => {
  comment.id = Math.random().toString().substring(2, 12);
  comment.timestamp = Date.now();
  return async (dispatch: (action: any) => void) => {
    await PostComment(comment)();
    dispatch(postActions.setComment(comment));
  };
};

export const VoteForComment = (comment: IComment, direction: number) => {
  return async (dispatch: (action: any) => void) => {
    await UpdateVoteForComment(comment, direction)();
    dispatch(
      postActions.voteComment({
        comment: comment,
        direction: direction,
      })
    );
  };
};

export const UpdatePost = (post: IPost) => {
  return async (dispatch: (action: any) => void) => {
    await EditPost(post);
    dispatch(postActions.setPost(post));
  };
};

export const UpdateComment = (comment: IComment) => {
  return async (dispatch: (action: any) => void) => {
    await EditComment(comment);
    dispatch(postActions.setComment(comment));
  };
};
