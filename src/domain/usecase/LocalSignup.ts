import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";

export class LocalSignup {
  constructor(private repository: IAuhRepository) {}

  async execute(request: LocalSignupRequest): Promise<void> {
    await this.repository.localSignup(request);
  }
}
