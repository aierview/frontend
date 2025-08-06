import { HttpPostParams } from "@/domain/model/HttpPostParams";
import { HttpResponse } from "@/domain/model/HttpResponse";

export interface IHttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>;
}
