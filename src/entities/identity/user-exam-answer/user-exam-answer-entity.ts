import { ResourceType, Whitelabel } from "../../../schema";

export namespace IUserExamAnswerClient {
  export interface IHTTPUserExamAnswer<Metadata = Record<string, unknown>> {
    resourceId: string;
    resourceType: ResourceType.USER_EXAM_ANSWER;
    contentId: string;
    examId: string;
    userExamId: string;
    userId: string;
    questionId: string;
    correct: boolean;
    value: string | null;
    whitelabel: Whitelabel;
    metadata: Metadata | null;
    createdAt: string;
    updatedAt: string;
  }

  export namespace IClass {
    export interface IProps<Metadata = Record<string, unknown>> {
      resourceId: string;
      resourceType: ResourceType.USER_EXAM_ANSWER;
      contentId: string;
      examId: string;
      userExamId: string;
      userId: string;
      questionId: string;
      correct: boolean;
      value: string | null;
      whitelabel: Whitelabel;
      metadata: Metadata | null;
      createdAt: Date;
      updatedAt: Date;
    }

    export namespace IMethods {
      export interface IConstructor {
        resourceId: IUserExamAnswerClient.IClass.IProps['resourceId'];
        resourceType: IUserExamAnswerClient.IClass.IProps['resourceType'];
        contentId: IUserExamAnswerClient.IClass.IProps['contentId'];
        examId: IUserExamAnswerClient.IClass.IProps['examId'];
        userExamId: IUserExamAnswerClient.IClass.IProps['userExamId'];
        userId: IUserExamAnswerClient.IClass.IProps['userId'];
        questionId: IUserExamAnswerClient.IClass.IProps['questionId'];
        correct: IUserExamAnswerClient.IClass.IProps['correct'];
        value: IUserExamAnswerClient.IClass.IProps['value'];
        whitelabel: IUserExamAnswerClient.IClass.IProps['whitelabel'];
        metadata: IUserExamAnswerClient.IClass.IProps['metadata'];
        createdAt: IUserExamAnswerClient.IClass.IProps['createdAt'];
        updatedAt: IUserExamAnswerClient.IClass.IProps['updatedAt'];
      }
    }
  }
}

export class UserExamAnswerClient {
  private props: IUserExamAnswerClient.IClass.IProps;

  public constructor(props: IUserExamAnswerClient.IClass.IMethods.IConstructor) {
    this.props = props;
  }

  public get resourceId(): IUserExamAnswerClient.IClass.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IUserExamAnswerClient.IClass.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get contentId(): IUserExamAnswerClient.IClass.IProps['contentId'] {
    return this.props.contentId;
  }

  public get examId(): IUserExamAnswerClient.IClass.IProps['examId'] {
    return this.props.examId;
  }

  public get userExamId(): IUserExamAnswerClient.IClass.IProps['userExamId'] {
    return this.props.userExamId;
  }

  public get userId(): IUserExamAnswerClient.IClass.IProps['userId'] {
    return this.props.userId;
  }

  public get questionId(): IUserExamAnswerClient.IClass.IProps['questionId'] {
    return this.props.questionId;
  }

  public get correct(): IUserExamAnswerClient.IClass.IProps['correct'] {
    return this.props.correct;
  }

  public get value(): IUserExamAnswerClient.IClass.IProps['value'] {
    return this.props.value;
  }

  public get whitelabel(): IUserExamAnswerClient.IClass.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get metadata(): IUserExamAnswerClient.IClass.IProps['metadata'] {
    return this.props.metadata;
  }

  public get createdAt(): IUserExamAnswerClient.IClass.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IUserExamAnswerClient.IClass.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}