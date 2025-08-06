export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super("O email " + email + " ja esta sendo utilizado!");
    this.name = "EmailAlreadyInUseError";
  }
}
