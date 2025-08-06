import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import HttpClient from "@/infra/axios/HttpClient";
import { NEXT_PUBLIC_API_URL } from "@/shared/lib";

export class AuthRepository implements IAuhRepository {
  private http = HttpClient.getInstance(NEXT_PUBLIC_API_URL);

  async localSignup(request: LocalSignupRequest): Promise<void> {
    await this.http.post("/auth/local/signup", request);
  }
}
