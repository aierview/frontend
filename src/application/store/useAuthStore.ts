import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { create } from "zustand";

type AuthStore = {
  isLoading: boolean;
  error: string | null;

  localSignup: (request: LocalSignupRequest) => Promise<void>;
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
  }));
