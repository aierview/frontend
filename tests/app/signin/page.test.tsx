import SigninPage from "@/app/(public)/signin/page";
import { useAuthStore } from "@/application/store/useAuthStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi } from "vitest";

vi.mock("@/application/store/useAuthStore", () => ({
  useAuthStore: vi.fn(),
}));

const mockLocalSignin = vi.fn();
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SigninPage", () => {
  const mockLocalSignin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      localSignin: mockLocalSignin,
      error: "",
    });

    (useRouter as unknown as vi.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders all form fields", () => {
    render(<SigninPage />);

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });

  it("shows validation errors when submitting invalid form", async () => {
    render(<SigninPage />);

    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "john@example" },
    });

    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Pass" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-email")).toHaveTextContent(
        "Formato de email invalido."
      );
      expect(screen.getByTestId("error-password")).toHaveTextContent(
        "enha inválida"
      );
    });
  });

  it("toggles password visibility", () => {
    render(<SigninPage />);
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const toggleButton = screen.getAllByTestId("togglePass")[0];

    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
  });

  it("calls localSignin with form values", async () => {
    mockLocalSignin.mockResolvedValue(true);

    render(<SigninPage />);

    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Password123!" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("submit")).toBeEnabled();
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockLocalSignin).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "Password123!",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("shows backend error if signin fails", async () => {
    mockLocalSignin.mockResolvedValue(false);

    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      localSignin: mockLocalSignin,
      error: "Invalid credentials",
    });

    render(<SigninPage />);

    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "jane@example.com" },
    });

    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(screen.getByTestId("error-subimt")).toHaveTextContent(
        "Invalid credentials"
      );
      expect(mockPush).toHaveBeenCalledTimes(0);
    });
  });
});
