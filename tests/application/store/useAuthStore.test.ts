import { createAuthStore } from "@/application/store/useAuthStore";
import { UserRole } from "@/domain/enums/UserRole";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

// mocks
const mockRepo: IAuhRepository = {
  localSignup: vi.fn(),
  localSignin: vi.fn(),
};

const requestSignup: LocalSignupRequest = {
  email: "test@example.com",
  password: "password123",
  name: "Test User",
  role: UserRole.BACKEND,
};

const requestSignin: LocalSigninRequest = {
  email: "test@example.com",
  password: "password123",
};

describe("AuthStore", () => {
  let store: ReturnType<typeof createAuthStore>;

  beforeEach(() => {
    store = createAuthStore(mockRepo);
    vi.clearAllMocks();
  });

  describe("localSignup", () => {
    it("should return true and not set error when signup is successful", async () => {
      vi.mocked(mockRepo.localSignup).mockResolvedValueOnce({
        success: true,
        data: null,
      });

      const result = await store.getState().localSignup(requestSignup);

      expect(result).toBe(true);
      expect(store.getState().error).toBe(null);
      expect(mockRepo.localSignup).toHaveBeenCalledWith(requestSignup);
    });

    it("should return false and set error when signup fails", async () => {
      const error = new UnexpectedError();

      vi.mocked(mockRepo.localSignup).mockResolvedValueOnce({
        success: false,
        data: error,
      });

      const result = await store.getState().localSignup(requestSignup);

      expect(result).toBe(false);
      expect(store.getState().error).toBe(error.message);
    });
  });

  describe("localSignin", () => {
    it("should return true and not set error when signin is successful", async () => {
      vi.mocked(mockRepo.localSignin).mockResolvedValueOnce({
        success: true,
        data: null,
      });

      const result = await store.getState().localSignin(requestSignin);

      expect(result).toBe(true);
      expect(store.getState().error).toBe(null);
      expect(mockRepo.localSignin).toHaveBeenCalledWith(requestSignin);
    });

    it("should return false and set error when signin fails", async () => {
      const error = new UnexpectedError();

      vi.mocked(mockRepo.localSignin).mockResolvedValueOnce({
        success: false,
        data: error,
      });

      const result = await store.getState().localSignin(requestSignin);

      expect(result).toBe(false);
      expect(store.getState().error).toBe(error.message);
    });
  });
});
