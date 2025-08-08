export class InvalidCredentialError extends Error {
  constructor() {
    super("Email e/ou senha incorreto(s)!");
    this.name = "InvalidCredentialError";
  }
}
