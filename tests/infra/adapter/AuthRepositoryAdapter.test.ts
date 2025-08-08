import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";
import { UserRole } from "@/domain/enums/UserRole";
import { BadRequestError } from "@/domain/errors/BadRequestError";
import { EmailAlreadyInUseError } from "@/domain/errors/EmailAlreadyInUseError";
import { InvalidCredentialError } from "@/domain/errors/InvalidCredentialError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSigninRequest } from "@/domain/model/local/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/local/LocalSignupRequest";
import { AuthRepositoryAdapter } from "@/infra/adapter/AuthRepositoryAdapter";
import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/infra/axios/AxiosHttpClient");

describe("AuthRepository", () => {
  let mockAxiosClient: AxiosHttpClient;
  let authRepo: AuthRepositoryAdapter;

  beforeEach(() => {
    mockAxiosClient = {
      post: vi.fn(),
    } as unknown as AxiosHttpClient;

    authRepo = new AuthRepositoryAdapter(mockAxiosClient);
  });

  describe("localSignup", () => {
    const signupRequest: LocalSignupRequest = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
      role: UserRole.BACKEND,
    };

    it("should return success when status is 201 (created)", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.created,
        body: null,
      });

      const response = await authRepo.localSignup(signupRequest);

      expect(response).toEqual({
        success: true,
        data: null,
      });
    });

    it("should return BadRequestError when status is 400", async () => {
      const body = { message: "Invalid data" };
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.badRequest,
        body,
      });

      const response = await authRepo.localSignup(signupRequest);

      expect(response.success).toBe(false);
      expect(response.data).toEqual(new BadRequestError(body));
    });

    it("should return EmailAlreadyInUseError when status is 409", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.conflict,
        body: null,
      });

      const response = await authRepo.localSignup(signupRequest);

      expect(response.success).toBe(false);
      expect(response.data).toEqual(
        new EmailAlreadyInUseError(signupRequest.email)
      );
    });

    it("should return UnexpectedError when status is 500", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.serverError,
        body: null,
      });

      const response = await authRepo.localSignup(signupRequest);

      expect(response.success).toBe(false);
      expect(response.data).toBeInstanceOf(UnexpectedError);
    });

    it("should default to UnexpectedError for unhandled status", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.serverError,
        body: null,
      });

      const response = await authRepo.localSignup(signupRequest);

      expect(response.success).toBe(false);
      expect(response.data).toBeInstanceOf(UnexpectedError);
    });
  });

  describe("localSignin", () => {
    const signinRequest: LocalSigninRequest = {
      email: "test@example.com",
      password: "password123",
    };

    it("should return success when status is 200 (ok)", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.ok,
        body: null,
      });

      const response = await authRepo.localSignin(signinRequest);

      expect(response).toEqual({
        success: true,
        data: null,
      });
    });

    it("should return BadRequestError when status is 400", async () => {
      const body = { message: "Missing fields" };
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.badRequest,
        body,
      });

      const response = await authRepo.localSignin(signinRequest);

      expect(response.success).toBe(false);
      expect(response.data).toEqual(new BadRequestError(body));
    });

    it("should return InvalidCredentialError when status is 401", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.unauthorized,
        body: null,
      });

      const response = await authRepo.localSignin(signinRequest);

      expect(response.success).toBe(false);
      expect(response.data).toBeInstanceOf(InvalidCredentialError);
    });

    it("should return UnexpectedError when status is 500", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: HttpStatusCode.serverError,
        body: null,
      });

      const response = await authRepo.localSignin(signinRequest);

      expect(response.success).toBe(false);
      expect(response.data).toBeInstanceOf(UnexpectedError);
    });

    it("should default to UnexpectedError for unhandled status", async () => {
      vi.mocked(mockAxiosClient.post).mockResolvedValueOnce({
        statusCode: 999,
        body: null,
      });

      const response = await authRepo.localSignin(signinRequest);

      expect(response.success).toBe(false);
      expect(response.data).toBeInstanceOf(UnexpectedError);
    });
  });
});
