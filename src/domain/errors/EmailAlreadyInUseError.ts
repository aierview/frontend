export class EmailAlreadyInUseError extends Error {
  constructor(email?: string, message?: string) {
    super(message || "O email " + email + " ja esta sendo utilizado!");
    this.name = "EmailAlreadyInUseError";
  }
}
