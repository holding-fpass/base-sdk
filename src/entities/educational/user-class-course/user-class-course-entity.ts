import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IUserClassCourseClient {

  export interface IHTTPUserClassCourse {
    resourceId: string;
    resourceType: ResourceType.CLASS_COURSE;
    courseId: string;
    skipped: boolean;
    userId: string;
    finishedAt: string | null;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.CLASS_COURSE;
    courseId: string;
    skipped: boolean;
    userId: string;
    finishedAt: Date | null;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId: IUserClassCourseClient.IProps['resourceId'];
    resourceType: IUserClassCourseClient.IProps['resourceType'];
    courseId: IUserClassCourseClient.IProps['courseId'];
    skipped: IUserClassCourseClient.IProps['skipped'];
    userId: IUserClassCourseClient.IProps['userId'];
    finishedAt: IUserClassCourseClient.IProps['finishedAt'];
    whitelabel: IUserClassCourseClient.IProps['whitelabel'];
    createdAt: IUserClassCourseClient.IProps['createdAt'];
    updatedAt: IUserClassCourseClient.IProps['updatedAt'];
    deletedAt: IUserClassCourseClient.IProps['deletedAt'];
  }
}

export class UserClassCourseClient {
  private props: IUserClassCourseClient.IProps;

  public constructor(props: IUserClassCourseClient.IConstructor) {
    this.props = props;
  }

  public get resourceId(): IUserClassCourseClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IUserClassCourseClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get courseId(): IUserClassCourseClient.IProps['courseId'] {
    return this.props.courseId;
  }

  public get skipped(): IUserClassCourseClient.IProps['skipped'] {
    return this.props.skipped;
  }

  public get userId(): IUserClassCourseClient.IProps['userId'] {
    return this.props.userId;
  }

  public get finishedAt(): IUserClassCourseClient.IProps['finishedAt'] {
    return this.props.finishedAt;
  }

  public get whitelabel(): IUserClassCourseClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IUserClassCourseClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IUserClassCourseClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IUserClassCourseClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
