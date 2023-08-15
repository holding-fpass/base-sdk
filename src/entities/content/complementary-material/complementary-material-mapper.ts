import { ComplementaryMaterialClient, IComplementaryMaterialClient } from "./complementary-material-entity";

export class ComplementaryMaterialClientMapper {
  public static toApplication(HTTPComplementaryMaterial: IComplementaryMaterialClient.IHTTPComplementaryMaterial): ComplementaryMaterialClient {
    return new ComplementaryMaterialClient({
      resourceId: HTTPComplementaryMaterial.resourceId,
      resourceType: HTTPComplementaryMaterial.resourceType,
      name: HTTPComplementaryMaterial.name,
      type: HTTPComplementaryMaterial.type,
      url: HTTPComplementaryMaterial.url,
      createdAt: new Date(HTTPComplementaryMaterial.createdAt),
      updatedAt: new Date(HTTPComplementaryMaterial.updatedAt),
    });
  }

  public static toHTTP(complementaryMaterial: ComplementaryMaterialClient): IComplementaryMaterialClient.IHTTPComplementaryMaterial {
    return {
      resourceId: complementaryMaterial.resourceId,
      resourceType: complementaryMaterial.resourceType,
      name: complementaryMaterial.name,
      type: complementaryMaterial.type,
      url: complementaryMaterial.url,
      createdAt: complementaryMaterial.createdAt.toISOString(),
      updatedAt: complementaryMaterial.updatedAt.toISOString(),
    }
  }
}