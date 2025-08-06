import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import { AxiosError } from "axios";
import { create } from "zustand";

type AuthStore = {
  isLoading: boolean;
  error: string | null;

  localSignup: (request: LocalSignupRequest) => Promise<void>;
};

export const createAuthStore = (repo: AuthRepository) =>
  create<AuthStore>((set) => ({
    isLoading: false,
    error: null,

    localSignup: async (request: LocalSignupRequest) => {
      set({ isLoading: true, error: null });
      try {
        await repo.localSignup(request);
      } catch (err) {
        if (err instanceof AxiosError)
          set({ error: err?.response?.data?.data });
      } finally {
        set({ isLoading: false });
      }
    },
  }));

export const useAuthStore = createAuthStore(new AuthRepository());
