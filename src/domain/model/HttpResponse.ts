import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
