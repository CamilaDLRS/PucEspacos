import { User } from "../entities/user.entity";
import { UsersRepository } from "../repositories/users.repository";

export class UsersServices {

  public static async getAll(): Promise<User[]> {
    try {
      return await UsersRepository.getAll();
    } catch (error) {
      console.error(`Could not search users.`, error);
      throw error;
    }
  }

  public static async getById(id: string): Promise<User | null> {
    try {
      return await UsersRepository.getById(id);
    } catch (error) {
      console.error(`Could not search an user registration with id: ${id}.`, error);
      throw error;
    }
  }
}