import { getFirestore } from 'firebase-admin/firestore';
import { Document } from '../../../data';

export function useFirestore() {
  if (!Document.app) {
    throw new Error('Document App not initialized');
  }

  return getFirestore(Document.app);
}