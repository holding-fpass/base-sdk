export class FSMError extends Error {
  public data: any;

  constructor(message: string, data?: any) {
    super(message);
    this.name = "FSMError";
    this.data = data;
  }
}
