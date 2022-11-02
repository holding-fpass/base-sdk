import { QueryDocumentSnapshot } from '@google-cloud/firestore';
import { AppOptions, initializeApp } from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { Document } from '../../data';
import { useFirestore } from './hooks';

interface FirebaseDateField {
  [key: string]: {
    toDate(): string;
  };
}

export class FirestoreSDK {
  public static withConverter = {
    toFirestore<Type>(entity: Type) {
      return entity;
    },
    fromFirestore<Type>(snapshot: QueryDocumentSnapshot<Type>) {
      const data = snapshot.data() as Type & FirebaseDateField;
      return {
        ...data,
        timestamp: data?.timestamp?.toDate ? data.timestamp.toDate() : data.timestamp,
        createdAt: data?.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data?.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
        statusAt: data?.statusAt?.toDate ? data.statusAt.toDate() : data.statusAt,
        deletedAt: data?.deletedAt?.toDate ? data.deletedAt.toDate() : data.deletedAt,
        archivedAt: data?.archivedAt?.toDate ? data.archivedAt.toDate() : data.archivedAt,
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