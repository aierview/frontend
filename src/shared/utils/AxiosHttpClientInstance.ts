import axios, { AxiosInstance } from "axios";

export default class AxiosHttpClientInstance {
  private static instances: Map<string, AxiosInstance> = new Map();

  public static getInstance(baseUrl: string = ""): AxiosInstance {
    if (!AxiosHttpClientInstance.instances.has(baseUrl)) {
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

      AxiosHttpClientInstance.instances.set(baseUrl, instance);
    }

    return AxiosHttpClientInstance.instances.get(baseUrl)!;
  }
}
