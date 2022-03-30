import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export class Question extends Resource {
  resourceType = ResourceType.QUESTION;
  name!: string;
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

export class Form extends Resource<FormStatus> {
  resourceType = ResourceType.FORM;
  transitionMap = FormStatusTransitionMap;
  name!: string;
  description?: string;
  questions?: Partial<Question>[];
}

export class Response extends Resource {
  resourceType = ResourceType.RESPONSE;
  question!: Partial<Question>;
  value!: string;
  // Related
  user!: Partial<User>;
  reactions?: Partial<Response>[];
}
