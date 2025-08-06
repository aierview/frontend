export class UnexpectedError extends Error {
  constructor(message?: string) {
    const messageToUse =
      message || "Ocorreu erro inesperado, tente novamente mais tarde.";
    super(messageToUse);
    this.name = "UnexpectedError";
  }
}
