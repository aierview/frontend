import { UserRole } from "@/domain/enums/UserRole";
import { LocalSignupRequest } from "@/domain/model/LocalSignupRequest";
import { AuthRepository } from "@/infra/adapter/AuthRepository";
import HttpClient from "@/infra/axios/HttpClient";
import { AxiosInstance } from "axios";
import { vi } from "vitest";

vi.mock("@/infra/axios/HttpClient");

describe("AuthRepository", () => {
  let mockPost: ReturnType<typeof vi.fn>;
  let mockHttpClient: AxiosInstance;

  beforeEach(() => {
    mockPost = vi.fn().mockResolvedValue(undefined);
    mockHttpClient = { post: mockPost } as unknown as AxiosInstance;

    vi.mocked(HttpClient.getInstance).mockReturnValue(mockHttpClient);
  });

  it("should call post auth/local/signup with correct parameters", async () => {
    // Arrangetest
    const repositoy = new AuthRepository();

    const request: LocalSignupRequest = {
      email: "gervasio@example.com",
      password: "senhaSegura123",
      name: "Gervasio",
      role: UserRole.FULLSTACK,
    };

    await repositoy.localSignup(request);

    // Assert
    expect(mockPost).toHaveBeenCalledOnce();
    expect(mockPost).toHaveBeenCalledWith("/auth/local/signup", request);
  });
});
