import { createAuthStore } from "@/application/store/useAuthStore";
import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import {
  anyLocalSigninRequest,
  anyLocalSignupRequest,
} from "@@/shared/testdata/auth-test-fixture";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useAuthStore", () => {
  describe("localSignup", () => {
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
      const request: LocalSignupRequest = anyLocalSignupRequest();

      mockRepo.localSignup.mockResolvedValueOnce(undefined);

      await zustandStore.getState().localSignup(request);

      expect(mockRepo.localSignup).toHaveBeenCalledWith(request);
      expect(zustandStore.getState().isLoading).toBe(false);
      expect(zustandStore.getState().error).toBe(null);
    });

    it("should handle error on localSignup", async () => {
      const request: LocalSignupRequest = anyLocalSignupRequest();

      mockRepo.localSignup.mockRejectedValueOnce(
        new Error("An error occurred!")
      );

      await zustandStore.getState().localSignup(request);

      expect(mockRepo.localSignup).toHaveBeenCalledWith(request);
      expect(zustandStore.getState().isLoading).toBe(false);
      expect(zustandStore.getState().error).toBe("An error occurred!");
    });
  });

  describe("localSignin", () => {
    let store: ReturnType<ReturnType<typeof createAuthStore>["getState"]>;
    let mockRepo: { localSignin: ReturnType<typeof vi.fn> };
    let zustandStore: ReturnType<typeof createAuthStore>;

    beforeEach(() => {
      mockRepo = {
        localSignin: vi.fn(),
      };

      zustandStore = createAuthStore(mockRepo as unknown as AuthRepository);
      store = zustandStore.getState();
    });

    it("should call localSignin with correct parameters", async () => {
      const request: LocalSigninRequest = anyLocalSigninRequest();

      mockRepo.localSignin.mockResolvedValueOnce(undefined);

      await zustandStore.getState().localSignin(request);

      expect(mockRepo.localSignin).toHaveBeenCalledWith(request);
      expect(zustandStore.getState().isLoading).toBe(false);
      expect(zustandStore.getState().error).toBe(null);
    });

    it("should handle error on localSignin", async () => {
      const request: LocalSigninRequest = anyLocalSigninRequest();

      mockRepo.localSignin.mockRejectedValueOnce(
        new Error("An error occurred!")
      );

      await zustandStore.getState().localSignin(request);

      expect(mockRepo.localSignin).toHaveBeenCalledWith(request);
      expect(zustandStore.getState().isLoading).toBe(false);
      expect(zustandStore.getState().error).toBe("An error occurred!");
    });
  });
});
