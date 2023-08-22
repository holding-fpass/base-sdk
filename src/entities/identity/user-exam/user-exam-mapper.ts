import { IUserExamClient, UserExamClient } from "./user-exam-entity";

export class UserExamClientMapper {
  public static toHTTP(userExam: UserExamClient): IUserExamClient.IHTTPUserExam {
    return {
      resourceId: userExam.resourceId,
      resourceType: userExam.resourceType,
      contentId: userExam.contentId,
      examId: userExam.examId,
      userId: userExam.userId,
      attempts: userExam.attempts,
      orderQuestions: userExam.orderQuestions,
      status: userExam.status,
      whitelabel: userExam.whitelabel,
      metadata: userExam.metadata,
      createdAt: userExam.createdAt.toISOString(),
      updatedAt: userExam.updatedAt.toISOString(),
    }
  }

  public static toApplication(httpUserExam: IUserExamClient.IHTTPUserExam): UserExamClient {
    return new UserExamClient({
      resourceId: httpUserExam.resourceId,
      resourceType: httpUserExam.resourceType,
      contentId: httpUserExam.contentId,
      examId: httpUserExam.examId,
      userId: httpUserExam.userId,
      attempts: httpUserExam.attempts,
      orderQuestions: httpUserExam.orderQuestions,
      status: httpUserExam.status,
      whitelabel: httpUserExam.whitelabel,
      metadata: httpUserExam.metadata,
      createdAt: new Date(httpUserExam.createdAt),
      updatedAt: new Date(httpUserExam.updatedAt),
    });
  }
}