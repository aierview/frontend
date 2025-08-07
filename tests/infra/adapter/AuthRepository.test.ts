import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";
import { BadRequestError } from "@/domain/errors/BadRequestError";
import { EmailAlreadyInUseError } from "@/domain/errors/EmailAlreadyInUseError";
import { InvalidCredentialError } from "@/domain/errors/InvalidCredentialError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSigninRequest } from "@/domain/model/LocalSigninRequest";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import {
  anyLocalSigninRequest,
  anyLocalSignupRequest,
} from "@@/shared/testdata/auth-test-fixture";
import { vi } from "vitest";

describe("AuthRepository", () => {
  describe("LocalSignup", () => {
    const mockAxiosClient = {
      post: vi.fn(),
    };

    let sut: AuthRepository;

    beforeEach(() => {
      vi.clearAllMocks();
      sut = new AuthRepository(mockAxiosClient as any);
    });

    it("should call post auth/local/signup with correct parameters on localSignup", async () => {
      // Arrangetest
      mockAxiosClient.post.mockResolvedValueOnce({ statusCode: 201 });

      const request: LocalSignupRequest = anyLocalSignupRequest();
      await sut.localSignup(request);

      // Assert
      expect(mockAxiosClient.post).toHaveBeenCalledOnce();
      expect(mockAxiosClient.post).toHaveBeenCalledWith({
        url: "/auth/local/signup",
        body: request,
      });
    });

    it("should thow UnexpectedError on localSignup when post /auth/local/signup returns serverError", async () => {
      // Arrangetest
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.serverError,
        body: "dados inválidos",
      });
      const request: LocalSignupRequest = anyLocalSignupRequest();

      // Assert
      await expect(sut.localSignup(request)).rejects.toThrow(UnexpectedError);
    });

    it("should thow EmailAlreadyInUseError on localSignup when post /auth/local/signup returns conflict", async () => {
      // Arrangetest
      const request: LocalSignupRequest = anyLocalSignupRequest();
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.coflict,
        body: "O email " + request.email + " ja esta sendo utilizado!",
      });

      // Assert
      await expect(sut.localSignup(request)).rejects.toThrow(
        new EmailAlreadyInUseError(request.email)
      );
    });

    it("should thow BadRequestError on localSignup when post /auth/local/signup returns BadRequest", async () => {
      // Arrangetest
      const request: LocalSignupRequest = anyLocalSignupRequest();
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.badRequest,
        body: "O campo nome é obigatorio!",
      });

      // Assert
      await expect(sut.localSignup(request)).rejects.toThrow(
        new BadRequestError("O campo nome é obigatorio!")
      );
    });
  });

  describe("LocalSignin", () => {
    const mockAxiosClient = {
      post: vi.fn(),
    };

    let sut: AuthRepository;

    beforeEach(() => {
      vi.clearAllMocks();
      sut = new AuthRepository(mockAxiosClient as any);
    });

    it("Should call post auth/local/signin with correct params on lolca Sigin", async () => {
      mockAxiosClient.post.mockResolvedValueOnce({ statusCode: 201 });

      const request: LocalSigninRequest = anyLocalSigninRequest();
      await sut.localSigin(request);

      // Assert
      expect(mockAxiosClient.post).toHaveBeenCalledOnce();
      expect(mockAxiosClient.post).toHaveBeenCalledWith({
        url: "/auth/local/signin",
        body: request,
      });
    });

    it("should trhow unexpectError if post /auth/local/signin returns serverError", async () => {
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.serverError,
        body: "dados inválidos",
      });

      const request: LocalSigninRequest = anyLocalSigninRequest();
      await expect(sut.localSigin(request)).rejects.toThrow(UnexpectedError);
    });

    it("should trhow unauthorizedError if post /auth/local/signin returns unauthorized", async () => {
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.unauthorized,
      });

      const request: LocalSigninRequest = anyLocalSigninRequest();
      await expect(sut.localSigin(request)).rejects.toThrow(
        InvalidCredentialError
      );
    });

    it("should trhow BadRequestError if post /auth/local/signin returns badrequest", async () => {
      mockAxiosClient.post.mockResolvedValueOnce({
        statusCode: HttpStatusCode.badRequest,
        body: "O campo nome é obigatorio!",
      });

      const request: LocalSigninRequest = anyLocalSigninRequest();
      await expect(sut.localSigin(request)).rejects.toThrow(
        new BadRequestError("O campo nome é obigatorio!")
      );
    });
  });
});
