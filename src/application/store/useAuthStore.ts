import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { makeAuthRepository } from "@/main/factory/makeAuthRepository";
import { create } from "zustand";

export type AuthStore = {
  isLoading: boolean;
  error: string | null;

  localSignup: (request: LocalSignupRequest) => Promise<boolean>;
  localSignin: (request: LocalSigninRequest) => Promise<boolean>;
};

export const createAuthStore = (repo: IAuhRepository) =>
  create<AuthStore>((set) => ({
    isLoading: false,
    error: null,

    localSignup: async (request: LocalSignupRequest) => {
      let result: boolean = false;
      set({ isLoading: true, error: null });
      try {
        await repo.localSignup(request);
        result = true;
      } catch (error) {
        set({ error: (error as Error).message });
        result = false;
      } finally {
        set({ isLoading: false });
      }
      return result;
    },
    localSignin: async (request: LocalSigninRequest) => {
      let result: boolean = false;
      set({ isLoading: true, error: null });
      try {
        await repo.localSignin(request);
        result = true;
      } catch (error) {
        set({ error: (error as Error).message });
        result = false;
      } finally {
        set({ isLoading: false });
      }
      return result;
    },
  }));

export const useAuthStore = createAuthStore(makeAuthRepository());
