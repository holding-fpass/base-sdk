import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { App, initializeApp, AppOptions } from "firebase-admin/app";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Document } from "../../data";
import { useFirestore } from "./hooks";

interface FirebaseDateField {
  [key: string]: {
    toDate(): string;
  };
}

export class FirestoreResourceDataConverter<Type>
  implements FirestoreDataConverter<Type>
{
  toFirestore(
    modelObject: FirebaseFirestore.WithFieldValue<Type>
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: FirebaseFirestore.PartialWithFieldValue<Type>,
    options: FirebaseFirestore.SetOptions
  ): FirebaseFirestore.DocumentData;
  toFirestore(
    modelObject: unknown,
    options?: unknown
  ): FirebaseFirestore.DocumentData {
    throw new Error("Method not implemented.");
  }
  fromFirestore(
    snapshot: QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ): Type {
    const data = snapshot.data() as Type & FirebaseDateField;
    return {
      ...data,
      timestamp: data?.timestamp?.toDate
        ? data.timestamp.toDate()
        : data.timestamp,
      createdAt: data?.createdAt?.toDate
        ? data.createdAt.toDate()
        : data.createdAt,
      updatedAt: data?.updatedAt?.toDate
        ? data.updatedAt.toDate()
        : data.updatedAt,
      statusAt: data?.statusAt?.toDate ? data.statusAt.toDate() : data.statusAt,
      deletedAt: data?.deletedAt?.toDate
        ? data.deletedAt.toDate()
        : data.deletedAt,
      archivedAt: data?.archivedAt?.toDate
        ? data.archivedAt.toDate()
        : data.archivedAt,
    };
  }
}

export class FirestoreSDK {
  public static withConverter = {
    toFirestore<Type>(entity: Type) {
      return entity as Type;
    },
    fromFirestore<Type>(snapshot: QueryDocumentSnapshot<Type>) {
      const data = snapshot.data() as Type & FirebaseDateField;
      return {
        ...data,
        timestamp: data?.timestamp?.toDate
          ? data.timestamp.toDate()
          : data.timestamp,
        createdAt: data?.createdAt?.toDate
          ? data.createdAt.toDate()
          : data.createdAt,
        updatedAt: data?.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : data.updatedAt,
        statusAt: data?.statusAt?.toDate
          ? data.statusAt.toDate()
          : data.statusAt,
        deletedAt: data?.deletedAt?.toDate
          ? data.deletedAt.toDate()
          : data.deletedAt,
        archivedAt: data?.archivedAt?.toDate
          ? data.archivedAt.toDate()
          : data.archivedAt,
      };
    },
  };

  public static initialize(options?: AppOptions, appName?: string): App {
    // Initialize Firestore App
    Document.app = initializeApp(options, appName);

    // Get firestore instance
    const firestore = useFirestore();

    // Set settings
    firestore.settings({
      ignoreUndefinedProperties: true,
    });

    return Document.app;
  }
}
