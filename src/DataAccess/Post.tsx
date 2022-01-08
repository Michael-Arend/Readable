import { IPost } from "../Interfaces";
import { ReadableApi } from "./ApiConfig";
import { appStateActions } from "../Store/AppStateReducer";
import { CommentObjInArray } from "../Helper/Converter";
import { resourceLimits } from "worker_threads";

const baseUrl = ReadableApi.baseUrl;
const headers = ReadableApi.headers;

export const useFetchPosts = (): (() => Promise<IPost[]>) => {
  return async (): Promise<IPost[]> => {
    appStateActions.setLoading(true);
    appStateActions.setError("");
    const endpoint = ReadableApi.endpoints.getAllPosts;
    const result = await fetch(baseUrl + endpoint, headers)
      .then((result) => result.json())
      .catch((e) => appStateActions.setError(e));
    appStateActions.setLoading(false);
    return result;
  };
};

export const useFetchOnePost = (id: string): (() => Promise<IPost>) => {
  return async (): Promise<IPost> => {
    appStateActions.setLoading(true);
    appStateActions.setError("");
    const endpoint = ReadableApi.endpoints.getAllPosts;
    const result = await fetch(baseUrl + endpoint + id, headers)
      .then((result) => result.json())
      .catch((e) => appStateActions.setError(e));

    const rawComments = await fetch(
      baseUrl + endpoint + id + "/comments",
      headers
    )
      .then((result) => result.json())
      .catch((e) => appStateActions.setError(e));
    result.comments = CommentObjInArray(rawComments);
    appStateActions.setLoading(false);
    return result;
  };
};

export const useFetchPostsByCategory = (
  name: string
): (() => Promise<IPost[]>) => {
  return async (): Promise<IPost[]> => {
    appStateActions.setLoading(true);
    appStateActions.setError("");
    const result = await await fetch(baseUrl + name + "/posts", headers)
      .then((result) => result.json())
      .catch((e) => appStateActions.setError(e));
    appStateActions.setLoading(false);
    return result;
  };
};
