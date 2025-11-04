import { SWRConfiguration } from "swr";
import { apiFetcher } from "./apiClient";

export const defaultSWRConfig: SWRConfiguration = {
  fetcher: (key: string) => apiFetcher(key),
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};

