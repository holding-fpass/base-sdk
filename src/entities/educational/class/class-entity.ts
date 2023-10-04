import { ResourceType, Whitelabel } from "schema";


export namespace IClassClient {
  export interface IHTTPClass {
    resourceId: string;
    resourceType: ResourceType.CLASS;
    name: string;
    code: string;
    channelId: string;
    users: string[];
    interval: IClassClient.EInterval;
    intervalNumber: number;
    year: number;
    startDate: string;
    endDate: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
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
    code: string;
    channelId: string;
    users: string[];
    interval: IClassClient.EInterval;
    intervalNumber: number;
    year: number;
    startDate: Date;
    endDate: Date;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId: IClassClient.IProps['resourceId'];
    resourceType: IClassClient.IProps['resourceType'];
    name: IClassClient.IProps['name'];
    code: IClassClient.IProps['code'];
    channelId: IClassClient.IProps['channelId'];
    users: IClassClient.IProps['users'];
    interval: IClassClient.IProps['interval'];
    intervalNumber: IClassClient.IProps['intervalNumber'];
    year: IClassClient.IProps['year'];
    startDate: IClassClient.IProps['startDate'];
    endDate: IClassClient.IProps['endDate'];
    whitelabel: IClassClient.IProps['whitelabel'];
    createdAt: IClassClient.IProps['createdAt'];
    updatedAt: IClassClient.IProps['updatedAt'];
  }
}

export class ClassClient {
  private props: IClassClient.IProps;

  public constructor(props: IClassClient.IConstructor) {
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

  public get code(): string {
    return this.props.code;
  }

  public get channelId(): string {
    return this.props.channelId;
  }

  public get users(): string[] {
    return this.props.users;
  }

  public get interval(): IClassClient.EInterval {
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
}
