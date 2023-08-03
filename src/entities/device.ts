import { TLanguageTags } from "../i18n";
import { ResourceType, Whitelabel } from "../schema";

export namespace IDeviceClient {
  export namespace IClass {
    export interface IProps<Metadata = Record<string, unknown>> {
      resourceId: string;
      resourceType: ResourceType.DEVICE;
      name: string;
      userIds: string[];
      fingerprint: string;
      language: TLanguageTags;
      latitude: number | null;
      longitude: number | null;
      token: string;
      refreshToken: string;
      whitelabel: Whitelabel;
      metadata: Metadata | null;
      createdAt: Date;
      updatedAt: Date;
    }

    export namespace IMethods {
      export interface IConstructor<Metadata = Record<string, unknown>> {
        resourceId: IDeviceClient.IClass.IProps['resourceId'];
        resourceType: IDeviceClient.IClass.IProps['resourceType'];
        name: IDeviceClient.IClass.IProps['name'];
        userIds: IDeviceClient.IClass.IProps['userIds'];
        fingerprint: IDeviceClient.IClass.IProps['fingerprint'];
        language: IDeviceClient.IClass.IProps['language'];
        latitude: IDeviceClient.IClass.IProps['latitude'];
        longitude: IDeviceClient.IClass.IProps['longitude'];
        token: IDeviceClient.IClass.IProps['token'];
        refreshToken: IDeviceClient.IClass.IProps['refreshToken'];
        whitelabel: IDeviceClient.IClass.IProps['whitelabel'];
        metadata: IDeviceClient.IClass.IProps['metadata'];
        createdAt: IDeviceClient.IClass.IProps['createdAt'];
        updatedAt: IDeviceClient.IClass.IProps['updatedAt'];
      }
    }
  }
}

export class DeviceClient {
  private props: IDeviceClient.IClass.IProps;

  public constructor(props: IDeviceClient.IClass.IMethods.IConstructor) {
    this.props = props;
  }

  public get resourceId(): IDeviceClient.IClass.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IDeviceClient.IClass.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get name(): IDeviceClient.IClass.IProps['name'] {
    return this.props.name;
  }

  public get userIds(): IDeviceClient.IClass.IProps['userIds'] {
    return this.props.userIds;
  }

  public get fingerprint(): IDeviceClient.IClass.IProps['fingerprint'] {
    return this.props.fingerprint;
  }

  public get language(): IDeviceClient.IClass.IProps['language'] {
    return this.props.language;
  }

  public get latitude(): IDeviceClient.IClass.IProps['latitude'] {
    return this.props.latitude;
  }

  public get longitude(): IDeviceClient.IClass.IProps['longitude'] {
    return this.props.longitude;
  }

  public get token(): IDeviceClient.IClass.IProps['token'] {
    return this.props.token;
  }

  public get refreshToken(): IDeviceClient.IClass.IProps['refreshToken'] {
    return this.props.refreshToken;
  }

  public get whitelabel(): IDeviceClient.IClass.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get metadata(): IDeviceClient.IClass.IProps['metadata'] {
    return this.props.metadata;
  }

  public get createdAt(): IDeviceClient.IClass.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IDeviceClient.IClass.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}