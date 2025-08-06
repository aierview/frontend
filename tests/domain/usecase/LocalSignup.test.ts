import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { LocalSignup } from "@/domain/usecase/LocalSignup";
import { describe, expect, it, vi } from "vitest";
import { anyLocalSignupRequest } from "../../shared/testdata/auth-test-fixture";

describe("LocalSignup", () => {
  it("should call signup with correct parameters", async () => {
    // Arrangetest
    const mockRepository: IAuhRepository = {
      localSignup: vi.fn().mockResolvedValue(undefined),
    } as IAuhRepository;

    const useCase = new LocalSignup(mockRepository);
    const request: LocalSignupRequest = anyLocalSignupRequest();

    // Act
    await useCase.execute(request);

    // Assert
    expect(mockRepository.localSignup).toHaveBeenCalledOnce();
    expect(mockRepository.localSignup).toHaveBeenCalledWith(request);
  });
});
