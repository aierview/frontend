import { GoogleSignupRequest } from "@/domain/model/google/GoogleSignupRequest";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { RepositoryResponse } from "@/domain/model/repository/RepositoryResponse";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<RepositoryResponse>;
  localSignin(request: LocalSigninRequest): Promise<RepositoryResponse>;

  googleSignup(request: GoogleSignupRequest): Promise<RepositoryResponse>;
}
