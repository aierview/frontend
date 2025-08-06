// src/core/api/HttpClient.ts
import axios, { AxiosInstance } from "axios";

export default class HttpClient {
  private static instances: Map<string, AxiosInstance> = new Map();

  public static getInstance(baseUrl: string = ""): AxiosInstance {
    if (!HttpClient.instances.has(baseUrl)) {
      const instance = axios.create({
        baseURL: baseUrl,
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      instance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
      );

      HttpClient.instances.set(baseUrl, instance);
    }

    return HttpClient.instances.get(baseUrl)!;
  }
}
