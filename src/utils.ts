import { useState, useCallback, useEffect, useMemo } from "react";
import type { Note } from "./types";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { FetchConfig, FetchState, ZodError } from "./types";

export const ApiUrl = "https://api-notes-e6mf.onrender.com/api";

export function useFetch<T = unknown>({
  url,
  method = "GET",
  body = null,
  headers = {},
  autoFetch = true,
}: FetchConfig): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const defaultHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
    }),
    []
  );

  const fetchData = useCallback(
    async (
      overrideBody?: unknown,
      overrideHeaders?: Record<string, string>
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const config: AxiosRequestConfig = {
          url,
          method,
          headers: overrideHeaders ?? defaultHeaders ?? headers,
          withCredentials: true,
        };
        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
          config.data = overrideBody ?? body;
        }
        const response: AxiosResponse<T> = await axios(config);
        setData(response.data);
        return response.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorFromBackend = err.response?.data as { error?: string };
          setError(errorFromBackend?.error || err.message || "Unknown error");
        } else {
          setError("Unknown error");
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, defaultHeaders]
  );

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [fetchData, autoFetch]);

  return { data, loading, error, refetch: fetchData };
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformZodError = (err: ZodError[]) => {
  return err.map((n) => `${capitalize(n.path[0])} : ${n.error}`);
};

export const isNote = (data: unknown): data is Note => {
  return (
    typeof data === "object" &&
    data !== null &&
    "_id" in data &&
    "title" in data &&
    "content" in data &&
    "important" in data &&
    "tags" in data
  );
};
export const isSuceessResponse = (data: unknown) => {
  return typeof data === "object" && data !== null && "message" in data;
};
