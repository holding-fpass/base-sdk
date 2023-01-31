import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { Document } from '../src/data'
import { UserNotificationFirestoreRepository } from '../src/database/firestore/repositories'
import { NotificationType, StoryTrigger, Whitelabel } from '../src/schema'

// Initialize firebaseApp
Document.app = initializeApp()
getFirestore(Document.app).settings({
  ignoreUndefinedProperties: true,
})

const userNotificationFirestoreRepository =
  new UserNotificationFirestoreRepository({
    whitelabel: Whitelabel.DEFAULT,
    baseEntityResourceId: '',
  })

const bootstrap = async () => {
  const storieByTrigger =
    await userNotificationFirestoreRepository.findApplicableByTrigger(
      NotificationType.STORY,
      StoryTrigger.APP_OPEN,
    )

  const stories =
    await userNotificationFirestoreRepository.findApplicableByTrigger(
      NotificationType.STORY,
      StoryTrigger.APP_OPEN,
    )
}

bootstrap()
