import { IAuhRepository } from "@/domain/contract/repository/IAuhRepository";
import { GoogleSignupRequest } from "@/domain/model/google/GoogleSignupRequest";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { makeAuthRepository } from "@/main/factory/makeAuthRepositoryAdapter";
import { create } from "zustand";

export type AuthStore = {
  error: string | null;

  localSignup: (request: LocalSignupRequest) => Promise<boolean>;
  localSignin: (request: LocalSigninRequest) => Promise<boolean>;

  googleSignup: (request: GoogleSignupRequest) => Promise<boolean>;
};

export const createAuthStore = (repo: IAuhRepository) =>
  create<AuthStore>((set) => ({
    isLoading: false,
    error: null,

    localSignup: async (request: LocalSignupRequest) => {
      set({ error: null });
      const result = await repo.localSignup(request);
      if (!result.success) {
        set({ error: result.data.message });
        return false;
      }
      return true;
    },
    localSignin: async (request: LocalSigninRequest) => {
      set({ error: null });
      const result = await repo.localSignin(request);
      if (!result.success) {
        set({ error: result.data.message });
        return false;
      }
      return true;
    },
    googleSignup: async (request: GoogleSignupRequest) => {
      set({ error: null });
      const result = await repo.googleSignup(request);
      if (!result.success) {
        set({ error: result.data.message });
        return false;
      }
      return true;
    },
  }));

export const useAuthStore = createAuthStore(makeAuthRepository());
