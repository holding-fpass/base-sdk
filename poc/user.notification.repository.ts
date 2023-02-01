import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Document } from "../src/data";
import {
  StoryFirestoreRepository,
  UserNotificationFirestoreRepository,
} from "../src/database/firestore/repositories";
import { NotificationType, StoryTrigger, Whitelabel } from "../src/schema";

// Initialize firebaseApp
Document.app = initializeApp();
getFirestore(Document.app).settings({
  ignoreUndefinedProperties: true,
});

const userNotificationFirestoreRepository =
  new UserNotificationFirestoreRepository({
    whitelabel: Whitelabel.DEFAULT,
    baseEntityResourceId: "",
  });

const storyFirestoreRepository = new StoryFirestoreRepository({
  whitelabel: Whitelabel.DEFAULT,
});

const bootstrap = async () => {
  const notifications =
    await userNotificationFirestoreRepository.findApplicableByTrigger(
      NotificationType.STORY,
      StoryTrigger.APP_OPEN,
    );

  return notifications?.map(({ story }) => {
    storyFirestoreRepository
      .findById(story?.resourceId!)
      .then((res) => {
        const storyWithImage = res?.items?.map((item) => item?.image1080x1920);

        return {
          resourceId: story?.resourceId,
          imageUrl: storyWithImage,
        };
      })
      .catch((err) => console.log(err));
  });
};

bootstrap();
