import { HttpStatusCode } from "@/domain/enums/HttpStatusCode";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import { anyLocalSignupRequest } from "@@/shared/testdata/auth-test-fixture";
import { vi } from "vitest";

const mockAxiosClient = {
  post: vi.fn(),
};

describe("AuthRepository", () => {
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

  it("should thow UnexpectedError on localSignup", async () => {
    // Arrangetest
    mockAxiosClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
      body: "dados inválidos",
    });
    const request: LocalSignupRequest = anyLocalSignupRequest();

    // Assert
    await expect(sut.localSignup(request)).rejects.toThrow(UnexpectedError);
  });
});
