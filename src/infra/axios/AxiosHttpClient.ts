import { IHttpPostClient } from "@/domain/contract/http/IHttpPostClient";
import { HttpPostParams } from "@/domain/model/http/HttpPostParams";
import { HttpResponse } from "@/domain/model/http/HttpResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AxiosHttpClient implements IHttpPostClient<any, any> {
  constructor(private readonly externalHttp: AxiosInstance) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: AxiosResponse<any, any> | undefined;
    try {
      response = await this.externalHttp.post(params.url, params.body);
    } catch (error) {
      if (axios.isAxiosError(error)) response = error.response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else response = { status: 500 } as any;
    }

    return {
      statusCode: response?.status as number,
      body: response?.data?.data,
    };
  }
}
