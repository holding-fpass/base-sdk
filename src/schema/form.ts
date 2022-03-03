import { Resource } from "./resource";
import { User } from "./user";

export interface Question {
  name: string;
  description?: string;
  // Media
  image600x400?: string;
}

export enum FormStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const FormStatusTransitionMap = new Map<FormStatus, FormStatus[]>([
  [FormStatus.CREATED, [FormStatus.ACTIVE]],
]);

export interface Form extends Resource<FormStatus> {
  name: string;
  description?: string;
  questions: Question[];
}

export interface Response {
  question: Question;
  //
  value: string;
  //
  reactions: Response[];
  //
  user: User;
}
