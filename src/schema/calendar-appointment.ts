import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { ContentType } from "./course";
import { ImageUtils } from "../media";

export enum AppointmentType {
  MEET = "meet",
  LIVE = "live"
}

export enum CalendarDownloadFormats {
  ICS = "calendar.ics",
  ICAL = "calendar.ical"
}

export class CalendarAppointment
  extends Resource<ContentType>
  implements SearchableResource {
  resourceType = ResourceType.CALENDAR_APPOINTMENT;
  rvsp?: boolean;
  productId?: string;
  name?: string;
  productType = ResourceType.CONTENT;
  type?: AppointmentType;
  productDateStart?: string;
  userId?: string;
  userAvatar?: string;
  isPublic = true;
  isSearchable = true;
  public static asDisplayResource(resource: CalendarAppointment): DisplayResource<ResourceStatus> {
    return {
      resourceType: ResourceType.CALENDAR_APPOINTMENT,
      resourceId: resource.resourceId,
      h1: resource.name,
      parentId: resource.productId,
      parentType: ResourceType.CONTENT,
      isPublic: true,
      status: ResourceStatus.CREATED,
      open: resource.rvsp,
      isSearchable: resource.isSearchable,
      ownerId: resource.userId,
      dateStart: resource.productDateStart,
      imageUrl: ImageUtils.imageOptimized(
        resource.userAvatar as string,
        "160x40"
      ),
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
