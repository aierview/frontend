import { IAuhRepository } from "@/domain/contract/repository/IAuhRepository";
import { AuthRepositoryAdapter } from "@/infra/adapter/AuthRepositoryAdapter";
import { makeAxiosHttpClient } from "./makeAxiosHttpClient";

export const makeAuthRepository = (): IAuhRepository => {
  return new AuthRepositoryAdapter(makeAxiosHttpClient());
};
