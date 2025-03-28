import { ResourceType } from "../../../schema";

export namespace IComplementaryMaterialClient {
  export interface IHTTPComplementaryMaterial {
    resourceId: string;
    resourceType: ResourceType.COMPLEMENTARY_MATERIAL;
    name: string;
    type: IComplementaryMaterialClient.EComplementaryMaterialType;
    url: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
  }

  export enum EComplementaryMaterialType {
    DOWNLOAD = 'download',
    LINK = 'link',
  }

  export namespace IClass {
    export interface IProps<Metadata = Record<string, unknown>> {
      resourceId: string;
      resourceType: ResourceType.COMPLEMENTARY_MATERIAL;
      name: string;
      type: IComplementaryMaterialClient.EComplementaryMaterialType;
      url: string;
      password?: string
      createdAt: Date;
      updatedAt: Date;
    }

    export namespace IMethods {
      export interface IConstructor {
        resourceId: IComplementaryMaterialClient.IClass.IProps['resourceId'];
        resourceType: IComplementaryMaterialClient.IClass.IProps['resourceType'];
        name: IComplementaryMaterialClient.IClass.IProps['name'];
        type: IComplementaryMaterialClient.IClass.IProps['type'];
        url: IComplementaryMaterialClient.IClass.IProps['url'];
        password?: IComplementaryMaterialClient.IClass.IProps['password'];
        createdAt: IComplementaryMaterialClient.IClass.IProps['createdAt'];
        updatedAt: IComplementaryMaterialClient.IClass.IProps['updatedAt'];
      }
    }
  }
}

export class ComplementaryMaterialClient {
  private props: IComplementaryMaterialClient.IClass.IProps;

  public constructor(props: IComplementaryMaterialClient.IClass.IMethods.IConstructor) {
    this.props = props;
  }

  public get resourceId(): IComplementaryMaterialClient.IClass.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IComplementaryMaterialClient.IClass.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get name(): IComplementaryMaterialClient.IClass.IProps['name'] {
    return this.props.name;
  }

  public get type(): IComplementaryMaterialClient.IClass.IProps['type'] {
    return this.props.type;
  }

  public get url(): IComplementaryMaterialClient.IClass.IProps['url'] {
    return this.props.url;
  }

  public get password(): IComplementaryMaterialClient.IClass.IProps['password'] {
    return this.props.password;
  }

  public get createdAt(): IComplementaryMaterialClient.IClass.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IComplementaryMaterialClient.IClass.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}

