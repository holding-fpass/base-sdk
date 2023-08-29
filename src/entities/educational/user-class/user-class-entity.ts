import { ResourceType, Whitelabel } from "schema";


export namespace IUserClass {
  export interface IHTTPUserClass {
    resourceId: string;
    resourceType: ResourceType.CLASS;
    name: string;
    code?: string | null;
    channelId: string;
    userId: string;
    interval: IUserClass.EInterval;
    intervalNumber: number;
    year: number;
    startDate: string;
    endDate: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export enum EInterval {
    SEMESTER = 'SEMESTER',
    TRIMESTER = 'TRIMESTER',
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.CLASS;
    name: string;
    code?: string | null;
    channelId: string;
    userId: string;
    interval: IUserClass.EInterval;
    intervalNumber: number;
    year: number;
    startDate: Date;
    endDate: Date;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId: IUserClass.IProps['resourceId'];
    resourceType: IUserClass.IProps['resourceType'];
    name: IUserClass.IProps['name'];
    code?: IUserClass.IProps['code'];
    channelId: IUserClass.IProps['channelId'];
    userId: IUserClass.IProps['userId'];
    interval: IUserClass.IProps['interval'];
    intervalNumber: IUserClass.IProps['intervalNumber'];
    year: IUserClass.IProps['year'];
    startDate: IUserClass.IProps['startDate'];
    endDate: IUserClass.IProps['endDate'];
    whitelabel: IUserClass.IProps['whitelabel'];
    createdAt: IUserClass.IProps['createdAt'];
    updatedAt: IUserClass.IProps['updatedAt'];
    deletedAt: IUserClass.IProps['deletedAt'];
  }
}

export class UserClassClient {
  private props: IUserClass.IProps;

  public constructor(props: IUserClass.IConstructor) {
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

  public get code(): string | null {
    return this.props.code || null;
  }

  public get channelId(): string {
    return this.props.channelId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get interval(): IUserClass.EInterval {
    return this.props.interval;
  }

  public get intervalNumber(): number {
    return this.props.intervalNumber;
  }

  public get year(): number {
    return this.props.year;
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
