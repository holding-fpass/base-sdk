import { DeviceClient, IDeviceClient } from "./device-entity";

export class DeviceClientMapper {
  public static toApplication(device: IDeviceClient.IHTTPDevice): DeviceClient {
    return new DeviceClient({
      resourceId: device.resourceId,
      resourceType: device.resourceType,
      name: device.name,
      userIds: device.userIds,
      fingerprint: device.fingerprint,
      language: device.language,
      latitude: device.latitude,
      longitude: device.longitude,
      token: device.token,
      refreshToken: device.refreshToken,
      whitelabel: device.whitelabel,
      metadata: device.metadata,
      createdAt: new Date(device.createdAt),
      updatedAt: new Date(device.updatedAt),
    });
  }
}