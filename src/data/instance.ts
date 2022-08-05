import { getFirestore } from "firebase-admin/firestore";

import {
  Instance,
  InstanceApplications,
  MetadataMap,
  Whitelabel,
} from "../schema";
import { Document } from "./document";

export class InstanceUtils {
  static async getInstanceData(whitelabel: Whitelabel): Promise<Instance> {
    const snapshot = await getFirestore(Document.app)
      .collection(`management/${whitelabel}/instance`)
      .where("name", "==", whitelabel)
      .where("application", "==", InstanceApplications.FLABEL)
      .get();
    if (snapshot.docs.length === 0) {
      throw new Error("Instance not found");
    }
    const instanceDoc = snapshot.docs[0];
    return instanceDoc.data() as Instance;
  }
  static features(instance: Instance) {
    return new MetadataMap(instance.features);
  }
}
