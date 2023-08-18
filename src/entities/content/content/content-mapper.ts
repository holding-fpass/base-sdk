import { ComplementaryMaterialClientMapper } from "../complementary-material";
import { ContentClient, IContentClient } from "./content-entity";

export class ContentClientMapper {
  public static toApplication(HTTPContent: IContentClient.IHTTPContent): ContentClient {
    return new ContentClient({
      resourceId: HTTPContent.resourceId,
      resourceType: HTTPContent.resourceType,
      name: HTTPContent.name,
      type: HTTPContent.type,
      slug: HTTPContent.slug,
      description: HTTPContent.description,
      image144x80: HTTPContent.image144x80,
      image1440x720: HTTPContent.image1440x720,
      dateStart: HTTPContent.dateStart ? new Date(HTTPContent.dateStart) : HTTPContent.dateStart as null,
      dateEnd: HTTPContent.dateEnd ? new Date(HTTPContent.dateEnd) : HTTPContent.dateEnd as null,
      duration: HTTPContent.duration,
      forms: HTTPContent.forms,
      free: HTTPContent.free,
      mentors: HTTPContent.mentors,
      tags: HTTPContent.tags,
      courseId: HTTPContent.courseId,
      complementaryMaterials: HTTPContent.complementaryMaterials.map((complementaryMaterial) => ComplementaryMaterialClientMapper.toApplication(complementaryMaterial)),
      whitelabel: HTTPContent.whitelabel,
      metadata: HTTPContent.metadata,
      createdAt: new Date(HTTPContent.createdAt),
      updatedAt: new Date(HTTPContent.updatedAt),
    });
  }

  public static toHTTP(content: ContentClient): IContentClient.IHTTPContent {
    return {
      resourceId: content.resourceId,
      resourceType: content.resourceType,
      name: content.name,
      type: content.type,
      slug: content.slug,
      description: content.description,
      image144x80: content.image144x80,
      image1440x720: content.image1440x720,
      dateStart: content.dateStart ? content.dateStart.toISOString() : content.dateStart,
      dateEnd: content.dateEnd ? content.dateEnd.toISOString() : content.dateEnd,
      duration: content.duration,
      forms: content.forms,
      free: content.free,
      mentors: content.mentors,
      tags: content.tags,
      courseId: content.courseId,
      complementaryMaterials: content.complementaryMaterials.map((complementaryMaterial) => ComplementaryMaterialClientMapper.toHTTP(complementaryMaterial)),
      whitelabel: content.whitelabel,
      metadata: content.metadata,
      createdAt: content.createdAt.toISOString(),
      updatedAt: content.updatedAt.toISOString(),
    }
  }
}
