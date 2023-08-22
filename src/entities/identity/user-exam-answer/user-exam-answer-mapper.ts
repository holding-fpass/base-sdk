import { IUserExamAnswerClient, UserExamAnswerClient } from "./user-exam-answer-entity";

export class UserExamAnswerClientMapper {
  public static toHTTP(userExamAnswer: UserExamAnswerClient): IUserExamAnswerClient.IHTTPUserExamAnswer {
    return {
      resourceId: userExamAnswer.resourceId,
      resourceType: userExamAnswer.resourceType,
      contentId: userExamAnswer.contentId,
      examId: userExamAnswer.examId,
      userExamId: userExamAnswer.userExamId,
      userId: userExamAnswer.userId,
      questionId: userExamAnswer.questionId,
      value: userExamAnswer.value,
      whitelabel: userExamAnswer.whitelabel,
      metadata: userExamAnswer.metadata,
      createdAt: userExamAnswer.createdAt.toISOString(),
      updatedAt: userExamAnswer.updatedAt.toISOString(),
    }
  }

  public static toApplication(httpUserExamAnswer: IUserExamAnswerClient.IHTTPUserExamAnswer): UserExamAnswerClient {
    return new UserExamAnswerClient({
      resourceId: httpUserExamAnswer.resourceId,
      resourceType: httpUserExamAnswer.resourceType,
      contentId: httpUserExamAnswer.contentId,
      examId: httpUserExamAnswer.examId,
      userExamId: httpUserExamAnswer.userExamId,
      userId: httpUserExamAnswer.userId,
      questionId: httpUserExamAnswer.questionId,
      value: httpUserExamAnswer.value,
      whitelabel: httpUserExamAnswer.whitelabel,
      metadata: httpUserExamAnswer.metadata,
      createdAt: new Date(httpUserExamAnswer.createdAt),
      updatedAt: new Date(httpUserExamAnswer.updatedAt),
    });
  }
}