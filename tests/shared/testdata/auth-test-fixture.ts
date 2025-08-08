import { UserRole } from "@/domain/enums/UserRole";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";

export function anyLocalSignupRequest(): LocalSignupRequest {
  return {
    email: "gervasio@example.com",
    password: "senhaSegura123",
    name: "Gervasio",
    role: UserRole.FULLSTACK,
  };
}

export function anyLocalSigninRequest(): LocalSigninRequest {
  return {
    email: "gervasio@example.com",
    password: "senhaSegura123",
  };
}

export function anyAxiosFakeError(message: string) {
  return {
    isAxiosError: true,
    response: { data: { data: message } },
  };
}

export function anyUnexpectedFakeError() {
  return {
    isAxiosError: true,
    response: {
      data: {
        data: "An unexpected error occurred, please contact the support.",
      },
    },
  };
}
