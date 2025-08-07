import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";
import AxiosHttpClientInstance from "@/shared/utils/AxiosHttpClientInstance";
import { NEXT_PUBLIC_API_URL } from "@/shared/utils/lib";

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient(
    AxiosHttpClientInstance.getInstance(NEXT_PUBLIC_API_URL)
  );
};
