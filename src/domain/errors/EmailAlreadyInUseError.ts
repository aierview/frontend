export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("O email já esta sendo utilizado! Use outro email ou faca login.");
    this.name = "EmailAlreadyInUseError";
  }
}
