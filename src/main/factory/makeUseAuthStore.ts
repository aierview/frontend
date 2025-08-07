import { createAuthStore } from "@/application/store/useAuthStore";
import { makeAuthRepository } from "./makeAuthRepository";

export const makeUseAuthStore = (): ReturnType<typeof createAuthStore> => {
  return createAuthStore(makeAuthRepository());
};
