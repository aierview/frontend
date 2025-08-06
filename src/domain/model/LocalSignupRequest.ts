import { UserRole } from "@/domain/enums/UserRole";

export type LocalSignupRequest = {
  email: string;
  name: string;
  role: UserRole;
  password: string;
};
