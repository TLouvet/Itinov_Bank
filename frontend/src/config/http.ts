export const http = {
  get: async <T>(url: string): Promise<T> => _get(withAPIBase(url)),
  post: async <T, R>(url: string, data: T, options?: RequestInit): Promise<R> => _post(withAPIBase(url), data, options),
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

function withAPIBase(url: string) {
  return `${import.meta.env.VITE_API_URL}/${url}`;
}

function _get<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw new Error();
      }
      return data;
    });
}

function _post<T, D>(url: string, data: D, options?: RequestInit): Promise<T> {
  return fetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ?? JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => data);
}
