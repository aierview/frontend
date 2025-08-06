// tests/usecases/LocalSignup.test.ts

import { UserRole } from "@/domain/enums/UserRole";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { LocalSignup } from "@/domain/usecase/LocalSignup";
import { describe, expect, it, vi } from "vitest";

describe("LocalSignup Use Case", () => {
  it("should call signup with correct parameters", async () => {
    // Arrangetest
    const mockRepository: IAuhRepository = {
      localSignup: vi.fn().mockResolvedValue(undefined),
    } as IAuhRepository;

    const useCase = new LocalSignup(mockRepository);

    const request: LocalSignupRequest = {
      email: "gervasio@example.com",
      password: "senhaSegura123",
      name: "Gervasio",
      role: UserRole.FULLSTACK,
    };

    // Act
    await useCase.execute(request);

    // Assert
    expect(mockRepository.localSignup).toHaveBeenCalledOnce();
    expect(mockRepository.localSignup).toHaveBeenCalledWith(request);
  });
});
