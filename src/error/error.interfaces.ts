export interface IError {
  message: string;
  code?: number;
  data?: any;
  publish(): void;
}
