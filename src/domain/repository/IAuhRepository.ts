import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { LocalSigninRequest } from "../model/LocalSigninRequest";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<void>;
  localSigin(request: LocalSigninRequest): Promise<void>;
}
