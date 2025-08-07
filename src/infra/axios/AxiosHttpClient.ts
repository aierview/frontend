import { IHttpPostClient } from "@/domain/http/IHttpPostClient";
import { HttpPostParams } from "@/domain/model/HttpPostParams";
import { HttpResponse } from "@/domain/model/HttpResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  constructor(private readonly externalHttp: AxiosInstance) {}

  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse<any, any> | undefined;
    try {
      response = await this.externalHttp.post(params.url, params.body);
    } catch (error) {
      if (axios.isAxiosError(error)) response = error.response;
      else response = { status: 500 } as any;
    }

    return {
      statusCode: response?.status as number,
      body: response?.data?.data,
    };
  }
}
