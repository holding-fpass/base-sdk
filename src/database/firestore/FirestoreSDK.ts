import { AppOptions, initializeApp } from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { Document } from '../../data';
import { useFirestore } from './hooks';

export class FirestoreSDK {
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