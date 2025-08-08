import { createAuthStore } from "@/application/store/useAuthStore";
import { IAuhRepository } from "@/domain/contract/repository/IAuhRepository";
import { UserRole } from "@/domain/enums/UserRole";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { GoogleSignupRequest } from "@/domain/model/google/GoogleSignupRequest";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { beforeEach, describe, expect, it, vi } from "vitest";

// mocks
const mockRepo: IAuhRepository = {
  localSignup: vi.fn(),
  localSignin: vi.fn(),

  googleSignup: vi.fn(),
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

const requestGoogleSigup: GoogleSignupRequest = {
  idToken: "any_id_token",
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

      expect(result).toBeTruthy();
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

      expect(result).toBeFalsy();
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

      expect(result).toBeTruthy();
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

      expect(result).toBeFalsy();
      expect(store.getState().error).toBe(error.message);
    });
  });

  describe("GoogleSignup", () => {
    it("should return true and not set error when google signup is successful", async () => {
      vi.mocked(mockRepo.googleSignup).mockResolvedValueOnce({
        success: true,
        data: null,
      });

      const result = await store.getState().googleSignup(requestGoogleSigup);

      expect(result).toBeTruthy();
      expect(store.getState().error).toBe(null);
      expect(mockRepo.googleSignup).toHaveBeenCalledWith(requestGoogleSigup);
    });

    it("should return false and set error when google signup fails", async () => {
      const error = new UnexpectedError();

      vi.mocked(mockRepo.googleSignup).mockResolvedValueOnce({
        success: false,
        data: error,
      });

      const result = await store.getState().googleSignup(requestGoogleSigup);

      expect(result).toBeFalsy();
      expect(store.getState().error).toBe(error.message);
    });
  });
});
