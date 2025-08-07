import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { makeAuthRepository } from "@/main/factory/makeAuthRepository";
import { create } from "zustand";

export type AuthStore = {
  isLoading: boolean;
  error: string | null;

  localSignup: (request: LocalSignupRequest) => Promise<void>;
  localSignin: (request: LocalSigninRequest) => Promise<void>;
};

export const createAuthStore = (repo: IAuhRepository) =>
  create<AuthStore>((set) => ({
    isLoading: false,
    error: null,

    localSignup: async (request: LocalSignupRequest) => {
      set({ isLoading: true, error: null });
      try {
        await repo.localSignup(request);
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },
    localSignin: async (request: LocalSigninRequest) => {
      set({ isLoading: true, error: null });
      try {
        await repo.localSignin(request);
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },
  }));

export const useAuthStore = createAuthStore(makeAuthRepository());
