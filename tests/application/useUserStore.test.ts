import { createAuthStore } from "@/application/store/useAuthStore";
import { UserRole } from "@/domain/enums/UserRole";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useAuthStore", () => {
  let store: ReturnType<ReturnType<typeof createAuthStore>["getState"]>;
  let mockRepo: { localSignup: ReturnType<typeof vi.fn> };
  let zustandStore: ReturnType<typeof createAuthStore>;

  beforeEach(() => {
    // Criamos um mock do repositório
    mockRepo = {
      localSignup: vi.fn(),
    };

    // Criamos a store injetando o mock
    zustandStore = createAuthStore(mockRepo as unknown as AuthRepository);
    store = zustandStore.getState();
  });

  it("should call localSignup with correct parameters", async () => {
    const request: LocalSignupRequest = {
      email: "gervasio@example.com",
      password: "senhaSegura123",
      name: "Gervasio",
      role: UserRole.FULLSTACK,
    };

    // Simula sucesso da API
    mockRepo.localSignup.mockResolvedValueOnce(undefined);

    await zustandStore.getState().localSignup(request);

    expect(mockRepo.localSignup).toHaveBeenCalledWith(request);
    expect(zustandStore.getState().isLoading).toBe(false);
    expect(zustandStore.getState().error).toBe(null);
  });

  it("should handle error on localSignup", async () => {
    const request: LocalSignupRequest = {
      email: "erro@example.com",
      password: "senha123",
      name: "Erro",
      role: UserRole.FULLSTACK,
    };

    // Simula erro da API (AxiosError-like)
    const fakeError = {
      isAxiosError: true,
      response: { data: { data: "Email already in use!" } },
    };
    mockRepo.localSignup.mockRejectedValueOnce(fakeError);

    await zustandStore.getState().localSignup(request);

    expect(mockRepo.localSignup).toHaveBeenCalledWith(request);
    expect(zustandStore.getState().isLoading).toBe(false);
    expect(zustandStore.getState().error).toBe("Email already in use!");
  });

  it("should handle unexpected error on localSignup", async () => {
    const request: LocalSignupRequest = {
      email: "erro@example.com",
      password: "senha123",
      name: "Erro",
      role: UserRole.FULLSTACK,
    };

    // Simula erro da API (AxiosError-like)
    const fakeError = {
      isAxiosError: false,
      response: { data: { data: "Email already in use!" } },
    };
    mockRepo.localSignup.mockRejectedValueOnce(fakeError);

    await zustandStore.getState().localSignup(request);

    expect(mockRepo.localSignup).toHaveBeenCalledWith(request);
    expect(zustandStore.getState().isLoading).toBe(false);
    expect(zustandStore.getState().error).toBe(
      "An unexpected error occurred, please contact the support."
    );
  });
});

AxiosError;
