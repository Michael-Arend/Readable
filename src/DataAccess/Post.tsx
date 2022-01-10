import { IComment, IPost } from "../Interfaces";
import { ReadableApi, TransferData } from "./ApiConfig";
import { CommentObjInArray } from "../Helper/Converter";
const baseUrl = ReadableApi.baseUrl;

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

export const useFetchPosts =
  (): (() => Promise<IPost[]>) => async (): Promise<IPost[]> =>
    TransferData(baseUrl + "posts", GET);

export const useFetchOnePost = (id: string): (() => Promise<IPost>) => {
  return async (): Promise<IPost> => {
    const result = await TransferData(baseUrl + "posts/" + id, GET);
    const rawComments = await TransferData(
      baseUrl + "posts/" + id + "/comments",
      GET
    );
    result.comments = CommentObjInArray(rawComments);
    return result;
  };
};

export const useFetchPostsByCategory =
  (name: string): (() => Promise<IPost[]>) =>
  async (): Promise<IPost[]> =>
    TransferData(baseUrl + name + "/posts", GET);

export const PostNewPost =
  (post: IPost): (() => Promise<boolean>) =>
  async (): Promise<boolean> =>
    TransferData(baseUrl + "posts", POST, JSON.stringify(post));

export const UpdateVoteForPost =
  (post: IPost, direction: number) => async (): Promise<IPost[]> =>
    TransferData(
      baseUrl + "posts/" + post.id,
      POST,
      JSON.stringify({ option: direction > 0 ? "upVote" : "downVote" })
    );

export const DeletePost = (post: IPost): (() => Promise<IPost>) => {
  return TransferData(baseUrl + "posts/" + post.id, DELETE);
};

export const DeleteComment = (comment: IComment) =>
  TransferData(baseUrl + "comments/" + comment.id, DELETE);

export const PostComment =
  (comment: IComment): (() => Promise<IComment>) =>
  async (): Promise<IComment> =>
    TransferData(baseUrl + "comments", POST, JSON.stringify(comment));

export const UpdateVoteForComment =
  (comment: IComment, direction: number) => async (): Promise<IPost[]> =>
    TransferData(
      baseUrl + "comments/" + comment.id,
      POST,
      JSON.stringify({ option: direction > 0 ? "upVote" : "downVote" })
    );

export const EditComment = (comment: IComment) =>
  TransferData(
    baseUrl + "comments/" + comment.id,
    PUT,
    JSON.stringify({ body: comment.body })
  );

export const EditPost = async (post: IPost) =>
  TransferData(
    baseUrl + "posts/" + post.id,
    PUT,
    JSON.stringify({ title: post.title, body: post.body })
  );
