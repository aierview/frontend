import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";
import { BadRequestError } from "@/domain/errors/BadRequestError";
import { EmailAlreadyInUseError } from "@/domain/errors/EmailAlreadyInUseError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";

export class AuthRepository implements IAuhRepository {
  constructor(private readonly axiosClient: AxiosHttpClient) {}

  async localSignup(request: LocalSignupRequest): Promise<void> {
    const httpResponse = await this.axiosClient.post({
      url: "/auth/local/signup",
      body: request,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.badRequest:
        throw new BadRequestError(httpResponse.body);
      case HttpStatusCode.coflict:
        throw new EmailAlreadyInUseError(request.email);
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
    }
  }

  async localSigin(request: LocalSigninRequest): Promise<void> {
    const httpResponse = await this.axiosClient.post({
      url: "/auth/local/signin",
      body: request,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
    }
  }
}
