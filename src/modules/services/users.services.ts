import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { User } from "../entities/user.entity";
import { UserType } from "../enums/userType.enum";

import { UsersRepository } from "../repositories/users.repository";

export class UsersServices {

  public static async getAll(): Promise<User[]> {
    const users: User[] = await UsersRepository.getAll();

    if (users.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return users;
  }

  public static async getById(id: string): Promise<User | null> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return user;
  }

  public static async create(user: User): Promise<void> {
    if (await UsersRepository.getByEmail(user.email)) {
      throw new ApiError(409, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }

    await UsersRepository.create(user);
  }

  public static async update(id: string, schoolId: string | null, isActive: boolean, userType: UserType): Promise<void> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    user.schoolId = schoolId;
    user.isActive = isActive;
    user.userType = userType;

    await UsersRepository.update(user);
  }
}