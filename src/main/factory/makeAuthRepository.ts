import { IAuhRepository } from "@/domain/repository/IAuhRepository";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import { makeAxiosHttpClient } from "./makeAxiosHttpClient";

export const makeAuthRepository = (): IAuhRepository => {
  return new AuthRepository(makeAxiosHttpClient());
};
