import { ICategory } from "../Interfaces";
import { ReadableApi } from "./ApiConfig";
import { appStateActions } from "../Store/AppStateReducer";

const baseUrl = ReadableApi.baseUrl;
const headers = ReadableApi.headers;

export const useFetchCategories = (): (() => Promise<ICategory[]>) => {
  return async (): Promise<ICategory[]> => {
    appStateActions.setLoading(true);
    appStateActions.setError("");
    const response = await fetch(
      baseUrl + ReadableApi.endpoints.getAllCategories,
      headers
    )
      .then((result) => result.json())
      .catch((e) => appStateActions.setError(e));
    appStateActions.setLoading(false);

    return response;
  };
};
