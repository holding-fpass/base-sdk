import { ResourceType, Whitelabel } from "../../../schema";

export namespace IUserExamClient {
  export interface IHTTPUserExam<Metadata = Record<string, unknown>> {
    resourceId: string;
    resourceType: ResourceType.USER_EXAM;
    contentId: string;
    examId: string;
    userId: string;
    attempts: number;
    orderQuestions: string[];
    status: IUserExamClient.EStatus;
    whitelabel: Whitelabel;
    metadata: Metadata | null;
    createdAt: string;
    updatedAt: string;
  }

  export enum EStatus {
    CORRECTING = 'correcting',
    FINISHED = 'finished',
    INITIAL = 'initial',
    REVISED = 'revised',
    STARTED = 'started',
    UNAVAILABLE = 'unavailable',
  }

  export namespace IClass {
    export interface IProps<Metadata = Record<string, unknown>> {
      resourceId: string;
      resourceType: ResourceType.USER_EXAM;
      contentId: string;
      examId: string;
      userId: string;
      attempts: number;
      orderQuestions: string[];
      status: IUserExamClient.EStatus;
      whitelabel: Whitelabel;
      metadata: Metadata | null;
      createdAt: Date;
      updatedAt: Date;
    }

    export namespace IMethods {
      export interface IConstructor {
        resourceId: IUserExamClient.IClass.IProps['resourceId'];
        resourceType: IUserExamClient.IClass.IProps['resourceType'];
        contentId: IUserExamClient.IClass.IProps['contentId'];
        examId: IUserExamClient.IClass.IProps['examId'];
        userId: IUserExamClient.IClass.IProps['userId'];
        attempts: IUserExamClient.IClass.IProps['attempts'];
        orderQuestions: IUserExamClient.IClass.IProps['orderQuestions'];
        status: IUserExamClient.IClass.IProps['status'];
        whitelabel: IUserExamClient.IClass.IProps['whitelabel'];
        metadata: IUserExamClient.IClass.IProps['metadata'];
        createdAt: IUserExamClient.IClass.IProps['createdAt'];
        updatedAt: IUserExamClient.IClass.IProps['updatedAt'];
      }
    }
  }
}

export class UserExamClient {
  private props: IUserExamClient.IClass.IProps;

  public constructor(props: IUserExamClient.IClass.IMethods.IConstructor) {
    this.props = props;
  }

  public get resourceId(): IUserExamClient.IClass.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IUserExamClient.IClass.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get contentId(): IUserExamClient.IClass.IProps['contentId'] {
    return this.props.contentId;
  }

  public get examId(): IUserExamClient.IClass.IProps['examId'] {
    return this.props.examId;
  }

  public get userId(): IUserExamClient.IClass.IProps['userId'] {
    return this.props.userId;
  }

  public get attempts(): IUserExamClient.IClass.IProps['attempts'] {
    return this.props.attempts;
  }

  public retry() {
    this.props.attempts += 1;
  }

  public get orderQuestions(): IUserExamClient.IClass.IProps['orderQuestions'] {
    return this.props.orderQuestions;
  }

  public get status(): IUserExamClient.IClass.IProps['status'] {
    return this.props.status;
  }

  public setStatus(status: IUserExamClient.IClass.IProps['status']) {
    this.props.status = status;
  }

  public get whitelabel(): IUserExamClient.IClass.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get metadata(): IUserExamClient.IClass.IProps['metadata'] {
    return this.props.metadata;
  }

  public get createdAt(): IUserExamClient.IClass.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IUserExamClient.IClass.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}