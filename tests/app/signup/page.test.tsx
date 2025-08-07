import SignupPage from "@/app/(public)/signup/page";
import { useAuthStore } from "@/application/store/useAuthStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/application/store/useAuthStore", () => ({
  useAuthStore: vi.fn(),
}));

const mockLocalSignup = vi.fn();
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("SignupPage", () => {
  const mockLocalSignup = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      localSignup: mockLocalSignup,
      error: "",
    });
  });

  it("renders all form fields", () => {
    render(<SignupPage />);
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("role")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<SignupPage />);

    fireEvent.input(screen.getByTestId("name"), {
      target: { value: "J" },
    });
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "john@example" },
    });

    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Password1" },
    });
    fireEvent.input(screen.getByTestId("confirmPassword"), {
      target: { value: "Password123!" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-name")).toHaveTextContent(
        "Informa seu nome completo."
      );
      expect(screen.getByTestId("error-email")).toHaveTextContent(
        "Formato de email invalido."
      );
      expect(screen.getByTestId("error-password")).toHaveTextContent(
        "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
      );
      expect(screen.getByTestId("error-confirmPassword")).toHaveTextContent(
        "As senhas não coincidem!"
      );
    });
  });

  it("toggles password visibility", () => {
    render(<SignupPage />);
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const toggleButton = screen.getAllByTestId("togglePass")[0];

    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
  });

  it("calls localSignup with form values", async () => {
    mockLocalSignup.mockResolvedValue(true);

    render(<SignupPage />);

    fireEvent.input(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("role"), {
      target: { value: 2 },
    });
    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Password123!" },
    });
    fireEvent.input(screen.getByTestId("confirmPassword"), {
      target: { value: "Password123!" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("submit")).toBeEnabled();
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mockLocalSignup).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123!",
        role: "BACKEND",
      });
    });
  });

  it("shows backend error if signup fails", async () => {
    mockLocalSignup.mockResolvedValue(false);

    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      localSignup: mockLocalSignup,
      error: "Email already in use",
    });

    render(<SignupPage />);
    fireEvent.input(screen.getByTestId("name"), {
      target: { value: "Jane" },
    });
    fireEvent.input(screen.getByTestId("email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByTestId("role"), {
      target: { value: "USER" },
    });
    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Password123" },
    });
    fireEvent.input(screen.getByTestId("confirmPassword"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(screen.getByTestId("error-subimt")).toHaveTextContent(
        "Email already in use"
      );
    });
  });
});
