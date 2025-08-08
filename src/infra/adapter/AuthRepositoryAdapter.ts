import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";
import { BadRequestError } from "@/domain/errors/BadRequestError";
import { EmailAlreadyInUseError } from "@/domain/errors/EmailAlreadyInUseError";
import { InvalidCredentialError } from "@/domain/errors/InvalidCredentialError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { RepositoryResponse } from "@/domain/model/repository/RepositoryResponse";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";

export class AuthRepositoryAdapter implements IAuhRepository {
  constructor(private readonly axiosClient: AxiosHttpClient) {}

  async localSignup(request: LocalSignupRequest): Promise<RepositoryResponse> {
    const httpResponse = await this.axiosClient.post({
      url: "/auth/local/signup",
      body: request,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return {
          success: true,
          data: null,
        };

      case HttpStatusCode.badRequest:
        return {
          success: false,
          data: new BadRequestError(httpResponse.body),
        };
      case HttpStatusCode.conflict:
        return {
          success: false,
          data: new EmailAlreadyInUseError(request.email),
        };
      default:
      case HttpStatusCode.serverError:
        return {
          success: false,
          data: new UnexpectedError(),
        };
    }
  }

  async localSignin(request: LocalSigninRequest): Promise<RepositoryResponse> {
    let repoResponse: RepositoryResponse;

    const httpResponse = await this.axiosClient.post({
      url: "/auth/local/signin",
      body: request,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          success: true,
          data: null,
        };
      case HttpStatusCode.badRequest:
        return {
          success: false,
          data: new BadRequestError(httpResponse.body),
        };
      case HttpStatusCode.unauthorized:
        return {
          success: false,
          data: new InvalidCredentialError(),
        };
      default:
      case HttpStatusCode.serverError:
        return {
          success: false,
          data: new UnexpectedError(),
        };
    }
  }
}
