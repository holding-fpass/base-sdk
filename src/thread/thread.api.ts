import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { Document } from "../data";
import { BaseEvent, ResourceType } from "../schema";
import { v4 as uuid } from "uuid";

export class ThreadAPI {
  static async createEvent(
    thread: {
      whitelabel: string;
      threadId: string;
      threadType: ResourceType;
    },
    event: BaseEvent
  ) {
    // Create Resource Thread
    event.eventId = event?.eventId ?? uuid();
    const eventDocPath = `management/${thread.whitelabel}/thread/${thread.threadId}-${thread.threadType}/interactions/${event.eventId}`;
    const timestamp = Timestamp.now();
    const eventDocData = {
      ...event,
      timestamp,
    };
    // Persist
    const doc = await getFirestore(Document.app)
      .doc(eventDocPath)
      .create(eventDocData);
    // Return
    return {
      id: event.eventId,
      date: doc.writeTime.toDate(),
    };
  }
}
