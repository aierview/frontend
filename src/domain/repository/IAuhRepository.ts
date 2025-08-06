import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";

export interface IAuhRepository {
  localSignup(request: LocalSignupRequest): Promise<void>;
}
