import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { User } from "../entities/user.entity";
import { UsersRepository } from "../repositories/users.repository";

export class UsersServices {

  public static async getAll(): Promise<User[]> {
    const usersList : User[] = await UsersRepository.getAll();
    if (usersList.length == 0) {
      throw new ApiError(404, InternalCode.USER_NOT_FOUND);
    }

    return usersList;
  }

  public static async getById(id: string): Promise<User | null> {
    const user = await UsersRepository.getById(id);
    if (!user) { 
      throw new ApiError(404, InternalCode.USER_NOT_FOUND);
    }

    return user;
  }

  public static async createUser(user : User): Promise<void> {
    if (await UsersRepository.getByEmail(user.email)) {
      throw new ApiError(409, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }
    await UsersRepository.createUser(user);
  }
}