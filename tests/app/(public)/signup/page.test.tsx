import SignupPage from "@/app/(public)/signup/page";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Signup page", () => {
  it("should start with initial state", () => {
    render(<SignupPage />);

    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    const errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(nameInput.value).toBe("");
    expect(errorNameInput.textContent).toBe("");

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    const errorEmailInput = screen.getByTestId(
      "error-email"
    ) as HTMLSpanElement;
    expect(emailInput.value).toBe("");
    expect(errorEmailInput.textContent).toBe("");

    const roleInput = screen.getByTestId("role") as HTMLSelectElement;
    const errorRole = screen.getByTestId("error-role") as HTMLSpanElement;
    expect(roleInput.value).toBe("");
    expect(errorRole.textContent).toBe("");

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const errorPassword = screen.getByTestId(
      "error-password"
    ) as HTMLSpanElement;
    expect(passwordInput.value).toBe("");
    expect(passwordInput.type).toBe("password");
    expect(errorPassword.textContent).toBe("");

    const confirmPasswordInput = screen.getByTestId(
      "confirmPassword"
    ) as HTMLInputElement;
    const errorConfirmPassword = screen.getByTestId(
      "error-password"
    ) as HTMLSpanElement;
    expect(confirmPasswordInput.value).toBe("");
    expect(confirmPasswordInput.type).toBe("password");
    expect(errorConfirmPassword.textContent).toBe("");

    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it("should show name error message whem name is empty", async () => {
    render(<SignupPage />);

    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "a" } });

    await screen.findByTestId("error-name");
    const errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(errorNameInput.textContent).toBe("Inform seu nome completo.");
  });

  it("should change password input to text when view btn is clicked", () => {
    render(<SignupPage />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const passwordButton = screen.getByTestId("togglePass");
    const errorConfirmPassword = screen.getByTestId(
      "error-password"
    ) as HTMLSpanElement;
    fireEvent.click(passwordButton);
    expect(passwordInput.type).toBe("text");
    expect(errorConfirmPassword.textContent).toBe("");
  });
});
