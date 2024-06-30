type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method: RequestMethod;
  headers?: HeadersInit;
  body?: any;
}

interface ResponseData<T = any> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

const buildUrl = (endpoint: string): string => {
  return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
};

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

const handleResponse = async <T>(
  response: Response
): Promise<ResponseData<T>> => {
  if (!response.ok) {
    return { status: "error", message: "error message type" };
  }
  try {
    const data = await response.json();
    return { status: "success", data: data.data };
  } catch {
    return { status: "error", message: "Data could not resolve" };
  }
};

const request = async <T>(
  endpoint: string,
  options: RequestOptions
): Promise<ResponseData<T>> => {
  const url = buildUrl(endpoint);
  const config: RequestInit = {
    method: options.method,
    headers: { ...defaultHeaders, ...options.headers },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response);
  } catch (error) {
    return { status: "error", message: (error as Error).message };
  }
};

const get = <T>(
  endpoint: string,
  headers?: HeadersInit
): Promise<ResponseData<T>> => {
  return request<T>(endpoint, { method: "GET", headers });
};

const post = <T>(
  endpoint: string,
  body?: any,
  headers?: HeadersInit
): Promise<ResponseData<T>> => {
  return request<T>(endpoint, { method: "POST", body, headers });
};

const put = <T>(
  endpoint: string,
  body?: any,
  headers?: HeadersInit
): Promise<ResponseData<T>> => {
  return request<T>(endpoint, { method: "PUT", body, headers });
};

const del = <T>(
  endpoint: string,
  headers?: HeadersInit
): Promise<ResponseData<T>> => {
  return request<T>(endpoint, { method: "DELETE", headers });
};

const patch = <T>(
  endpoint: string,
  body?: any,
  headers?: HeadersInit
): Promise<ResponseData<T>> => {
  return request<T>(endpoint, { method: "PATCH", body, headers });
};

export { get, post, put, del as delete, patch };
