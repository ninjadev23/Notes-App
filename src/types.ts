export interface Note {
    _id: string;
    title: string;
    content: string;
    important: boolean;
    tags: string[];
}
export type suceessResponse = {
    message: string;
}
export type errorResponse = {
    error: string;
}

export interface FetchConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  autoFetch?: boolean;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null | ZodError;
  refetch: (overrideBody?: unknown, overrideHeaders?: Record<string, string>) => Promise<T | null>;
}
export type ZodError = {
        path: string[],
        error: string
}