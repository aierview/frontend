import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { LocalSigninRequest } from "../model/local/LocalSigninRequest";
import { RepositoryResponse } from "../model/repository/RepositoryResponse";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<RepositoryResponse>;
  localSignin(request: LocalSigninRequest): Promise<RepositoryResponse>;
}
