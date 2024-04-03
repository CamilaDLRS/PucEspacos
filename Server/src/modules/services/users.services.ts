import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { UserDto } from "../dtos/user.dto";
import { UsersRepository } from "../repositories/users.repository";
import *  as uuid from 'uuid';

export class UsersServices {

  public static async getAll(): Promise<UserDto[]> {
    const users: UserDto[] = await UsersRepository.getAll();

    if (users.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return users;
  }

  public static async getById(id: string): Promise<UserDto> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return user;
  }

  public static async create(user: UserDto): Promise<string> {
    if (await UsersRepository.getByEmail(user.email)) {
      throw new ApiError(409, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }

    user.userId = uuid.v4();
    await UsersRepository.create(user);

    return user.userId;
  }

  public static async update(user: UserDto): Promise<void> {
    
    const userFromDb = await UsersRepository.getById(user.userId!);

    if (!userFromDb) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    userFromDb.update(user);

    await UsersRepository.update(user);
  }
}