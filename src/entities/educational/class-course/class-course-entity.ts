import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IClassCourseClient {
  export interface IHTTPClassCourse {
    resourceId: string;
    resourceType: ResourceType.CLASS_COURSE;
    courseId: string;
    classId: string;
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
    classId: string;
    finishedAt: Date | null;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId?: IClassCourseClient.IProps['resourceId'];
    resourceType?: IClassCourseClient.IProps['resourceType'];
    courseId: IClassCourseClient.IProps['courseId'];
    classId: IClassCourseClient.IProps['classId'];
    finishedAt: IClassCourseClient.IProps['finishedAt'];
    whitelabel: IClassCourseClient.IProps['whitelabel'];
    createdAt?: IClassCourseClient.IProps['createdAt'];
    updatedAt?: IClassCourseClient.IProps['updatedAt'];
    deletedAt?: IClassCourseClient.IProps['deletedAt'];
  }
}

export class ClassCourseClient {
  private props: IClassCourseClient.IProps;

  public constructor(props: IClassCourseClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.CLASS_COURSE,
      courseId: props.courseId,
      classId: props.classId,
      finishedAt: props.finishedAt || null,
      whitelabel: props.whitelabel,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IClassCourseClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IClassCourseClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get courseId(): IClassCourseClient.IProps['courseId'] {
    return this.props.courseId;
  }

  public get classId(): IClassCourseClient.IProps['classId'] {
    return this.props.classId;
  }

  public get finishedAt(): IClassCourseClient.IProps['finishedAt'] {
    return this.props.finishedAt;
  }

  public get whitelabel(): IClassCourseClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IClassCourseClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IClassCourseClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IClassCourseClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
