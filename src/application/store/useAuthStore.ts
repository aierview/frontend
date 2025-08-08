import { IAuhRepository } from "@/domain/contract/repository/IAuhRepository";
import { GoogleAuthRequest } from "@/domain/model/google/GoogleAuthRequest";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { makeAuthRepository } from "@/main/factory/makeAuthRepositoryAdapter";
import { create } from "zustand";

export type AuthStore = {
  error: string | null;
  setError: (error: string | null) => void;

  localSignup: (request: LocalSignupRequest) => Promise<boolean>;
  localSignin: (request: LocalSigninRequest) => Promise<boolean>;

  googleSignup: (request: GoogleAuthRequest) => Promise<boolean>;
  googleSignin: (request: GoogleAuthRequest) => Promise<boolean>;
};

export const createAuthStore = (repo: IAuhRepository) =>
  create<AuthStore>((set) => ({
    isLoading: false,
    error: null,

    setError: (error: string | null) => {
      set({ error });
    },

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
    googleSignup: async (request: GoogleAuthRequest) => {
      set({ error: null });
      const result = await repo.googleSignup(request);
      if (!result.success) {
        set({ error: result.data.message });
        return false;
      }
      return true;
    },

    googleSignin: async (request: GoogleAuthRequest) => {
      set({ error: null });
      const result = await repo.googleSignin(request);
      if (!result.success) {
        set({ error: result.data.message });
        return false;
      }
      return true;
    },
  }));

export const useAuthStore = createAuthStore(makeAuthRepository());
