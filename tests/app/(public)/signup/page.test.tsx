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

  it("should show name error message whem name has less than 6 characters", async () => {
    render(<SignupPage />);

    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "a" } });

    await screen.findByTestId("error-name");
    let errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(errorNameInput.textContent).toBe("Informa seu nome completo.");

    fireEvent.change(nameInput, { target: { value: "Ger" } });
    await screen.findByTestId("error-name");
    errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(errorNameInput.textContent).toBe("Informa seu nome completo.");

    fireEvent.change(nameInput, { target: { value: "Gerva" } });
    await screen.findByTestId("error-name");
    errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(errorNameInput.textContent).toBe("Informa seu nome completo.");

    fireEvent.change(nameInput, { target: { value: "Gerva" } });
    await screen.findByTestId("error-name");
    errorNameInput = screen.getByTestId("error-name") as HTMLSpanElement;
    expect(errorNameInput.textContent).toBe("Informa seu nome completo.");
  });

  it("should show email error message when email is invalid", async () => {
    render(<SignupPage />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "email" } });

    await screen.findByTestId("error-email");
    let errorEmailInput = screen.getByTestId("error-email") as HTMLSpanElement;
    expect(errorEmailInput.textContent).toBe("Formato de email invalido.");
  });

  it("should show password error message when password is invalid", async () => {
    render(<SignupPage />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "a" } });

    await screen.findByTestId("error-password");
    let errorPassword = screen.getByTestId("error-password") as HTMLSpanElement;
    expect(errorPassword.textContent).toBe(
      "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
    );

    fireEvent.change(passwordInput, { target: { value: "Pasword" } });
    await screen.findByTestId("error-password");
    errorPassword = screen.getByTestId("error-password") as HTMLSpanElement;
    expect(errorPassword.textContent).toBe(
      "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
    );

    fireEvent.change(passwordInput, { target: { value: "Pasword@" } });
    await screen.findByTestId("error-password");
    errorPassword = screen.getByTestId("error-password") as HTMLSpanElement;
    expect(errorPassword.textContent).toBe(
      "A senha deve ter pelo menos 6 caracteres, uma letra mauscula, um numero e um simbolo."
    );
  });

  it("should change password input type when view password button is clicked", () => {
    render(<SignupPage />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const passwordButton = screen.getByTestId("togglePass");
    const errorConfirmPassword = screen.getByTestId(
      "error-password"
    ) as HTMLSpanElement;

    fireEvent.click(passwordButton);
    expect(passwordInput.type).toBe("text");
    expect(errorConfirmPassword.textContent).toBe("");

    fireEvent.click(passwordButton);
    expect(passwordInput.type).toBe("password");
    expect(errorConfirmPassword.textContent).toBe("");
  });

  it("should show error message when password and confirm password are different", async () => {
    render(<SignupPage />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirmPassword"
    ) as HTMLInputElement;
    const errorConfirmPassword = screen.getByTestId(
      "error-confirmPassword"
    ) as HTMLSpanElement;

    fireEvent.change(passwordInput, { target: { value: "Password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password2" } });

    await screen.findByTestId("error-confirmPassword");
    expect(errorConfirmPassword.textContent).toBe("As senhas não coincidem!");
  });
});
