import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";
import AxiosHttpClientInstance from "@/shared/utils/AxiosHttpClientInstance";

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient(AxiosHttpClientInstance.getInstance());
};
