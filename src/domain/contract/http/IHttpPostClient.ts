import { HttpPostParams } from "@/domain/model/http/HttpPostParams";
import { HttpResponse } from "@/domain/model/http/HttpResponse";

export interface IHttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>;
}
