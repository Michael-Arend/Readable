import { appStateActions } from "../Store/AppStateReducer";

export const ReadableApi = {
  name: "readableApi",
  baseUrl: "http://localhost:3001/",
  headers: {
    headers: { Authorization: "fu", "Content-Type": "application/json" },
  },
  endpoints: { getAllPosts: "posts/", getAllCategories: "categories/" },
};

export const TransferData = (
  url: string,
  method: string,
  body?: string
): any => {
  appStateActions.setLoading(true);
  appStateActions.setError("");
  const requestOptions = {
    method: method,
    headers: ReadableApi.headers.headers,
    body: body,
  };
  const result = fetch(url, requestOptions)
    .then((result) => result.json())
    .catch((e) => appStateActions.setError(e));

  appStateActions.setLoading(false);
  return result;
};
