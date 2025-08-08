import { GoogleSigninRequest } from "@/domain/model/google/GoogleAuthRequest";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { RepositoryResponse } from "@/domain/model/repository/RepositoryResponse";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<RepositoryResponse>;
  localSignin(request: LocalSigninRequest): Promise<RepositoryResponse>;

  googleSignup(request: GoogleSigninRequest): Promise<RepositoryResponse>;
  googleSignin(request: GoogleSigninRequest): Promise<RepositoryResponse>;
}
