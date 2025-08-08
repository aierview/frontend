import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { LocalSigninRequest } from "../model/LocalSigninRequest";
import { RepositoryResponse } from "../model/RepositoryResponse";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<RepositoryResponse>;
  localSignin(request: LocalSigninRequest): Promise<RepositoryResponse>;
}
