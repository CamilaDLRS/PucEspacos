import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { UserDto } from "../dtos/user.dto";
import { UsersRepository } from "../repositories/users.repository";
import { Utils } from '../../shared/utils/utils';
import *  as uuid from 'uuid';
import { UserType } from "../enums/userType.enum";

export class UsersServices {

  public static async getAll(): Promise<UserDto[]> {
    const users: UserDto[] = await UsersRepository.getAll();

    if (users.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    for await (const user of users) {
      user.schoolName = await UsersRepository.getUserSchoolName(user);      
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

  public static async signIn(email: string, password: string): Promise<UserDto> {
    const user = await UsersRepository.signIn(email, password);

    if (!user) {
      throw new ApiError(401, InternalCode.INVALID_LOGIN_CREDENTIALS);
    }

    return user;
  }

  public static async create(user: UserDto): Promise<string> {
    if (await UsersRepository.getByEmail(user.email!)) {
      throw new ApiError(409, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }

    user.userId = uuid.v4();
    user.isActive = true;

    if (Utils.validateEmailDomain(user.email!, ["pucpr.edu.br"])) {
      user.userType = UserType.STUDENT;
    }
    else if (Utils.validateEmailDomain(user.email!, ["pucpr.br"])) {
      user.userType = UserType.TEACHER;
    }
    else {
      throw new ApiError(400, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }
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