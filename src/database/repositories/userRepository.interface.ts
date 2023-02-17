import { Query, QuerySnapshot } from "firebase-admin/firestore";
import { User, SystemTag } from "../../schema";
import { ICommonRepository } from "./commonRepository.interface";

export interface IUserRepository extends ICommonRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
  findByTags(tags: string[] | SystemTag): Promise<QuerySnapshot<User>>;
}
