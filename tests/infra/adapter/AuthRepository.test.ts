import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import { anyLocalSignupRequest } from "@@/shared/testdata/auth-test-fixture";
import { vi } from "vitest";

const mockAxiosClient = {
  post: vi.fn(),
};

const makeSut = () => {
  const sut = new AuthRepository(mockAxiosClient as any);
  return { sut };
};

describe("AuthRepository", () => {
  it("should call post auth/local/signup with correct parameters", async () => {
    // Arrangetest
    const { sut } = makeSut();
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
});
