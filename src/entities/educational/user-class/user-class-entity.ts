import { ResourceType, Whitelabel } from "schema";


export namespace IUserClassClient {
  export interface IHTTPUserClass {
    resourceId: string;
    resourceType: ResourceType.CLASS;
    name: string;
    channelId: string;
    userId: string;
    classId: string;
    startDate: string;
    endDate: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export enum EInterval {
    SEMESTER = 'semester',
    TRIMESTER = 'trimester',
    BIMESTER = 'bimester',
    MONTHLY = 'monthly'
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.CLASS;
    name: string;
    channelId: string;
    userId: string;
    classId: string;
    startDate: Date;
    endDate: Date;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId: IUserClassClient.IProps['resourceId'];
    resourceType: IUserClassClient.IProps['resourceType'];
    name: IUserClassClient.IProps['name'];
    channelId: IUserClassClient.IProps['channelId'];
    userId: IUserClassClient.IProps['userId'];
    classId: IUserClassClient.IProps['classId'];
    startDate: IUserClassClient.IProps['startDate'];
    endDate: IUserClassClient.IProps['endDate'];
    whitelabel: IUserClassClient.IProps['whitelabel'];
    createdAt: IUserClassClient.IProps['createdAt'];
    updatedAt: IUserClassClient.IProps['updatedAt'];
    deletedAt: IUserClassClient.IProps['deletedAt'];
  }
}

export class UserClassClient {
  private props: IUserClassClient.IProps;

  public constructor(props: IUserClassClient.IConstructor) {
    this.props = props;
  }

  public get resourceId(): string {
    return this.props.resourceId;
  }

  public get resourceType(): ResourceType.CLASS {
    return this.props.resourceType;
  }

  public get name(): string {
    return this.props.name;
  }

  public get channelId(): string {
    return this.props.channelId;
  }

  public get classId(): string {
    return this.props.classId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get startDate(): Date {
    return this.props.startDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }

  public get whitelabel(): Whitelabel {
    return this.props.whitelabel;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | null {
    return this.props.deletedAt;
  }
}
