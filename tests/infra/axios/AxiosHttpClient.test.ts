// tests/infra/axios/AxiosHttpClient.test.ts
import { AxiosHttpClient } from "@/infra/axios/AxiosHttpClient";
import { AxiosInstance, AxiosResponse } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPost = vi.fn();
const mockAxiosInstance = {
  post: mockPost,
} as unknown as AxiosInstance;

describe("AxiosHttpClient", () => {
  let sut: AxiosHttpClient;

  const requestData = {
    url: "/test",
    body: { name: "Gervasio" },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new AxiosHttpClient(mockAxiosInstance);
  });

  it("Should call axios.post with correct params", async () => {
    mockPost.mockResolvedValueOnce({
      status: 200,
      data: { data: { message: "ok" } },
    });

    await sut.post(requestData);

    expect(mockPost).toHaveBeenCalledWith("/test", { name: "Gervasio" });
  });

  it("Should return statusCode and body correctly", async () => {
    const expectedResponse: AxiosResponse = {
      status: 201,
      data: { data: { id: 1, name: "Gervasio" } },
      statusText: "Created",
      headers: {},
      config: {},
    };

    mockPost.mockResolvedValueOnce(expectedResponse);

    const response = await sut.post(requestData);

    expect(response).toEqual({
      statusCode: 201,
      body: { id: 1, name: "Gervasio" },
    });
  });

  it("Should return status 400 if the error is an AxiosError (400)", async () => {
    mockPost.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 400,
        data: { data: "invalid data" },
      },
    });

    const response = await sut.post(requestData);

    expect(response).toEqual({
      statusCode: 400,
      body: "invalid data",
    });
  });

  it("Should return status 500 if the error is not an AxiosError", async () => {
    mockPost.mockRejectedValueOnce(new Error("algum erro genérico"));

    const response = await sut.post(requestData);

    expect(response).toEqual({
      statusCode: 500,
      body: undefined,
    });
  });
});
