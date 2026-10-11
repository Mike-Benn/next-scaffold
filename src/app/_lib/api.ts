import { envClient } from '@/env.client';

interface ApiErrorParams {
  status: number;
  message?: string;
}

export class ApiError extends Error {
  status: number;
  constructor({ status, message }: ApiErrorParams) {
    super(message ?? `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(url: string, reqInit?: RequestInit): Promise<T> {
  const res = await fetch(`${envClient.PUBLIC_URL}${url}`, reqInit);
  if (!res.ok) throw new ApiError({ status: res.status });
  return res.json() as Promise<T>;
}
