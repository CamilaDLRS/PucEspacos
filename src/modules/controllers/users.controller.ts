import { Request, Response } from "express";
import { UsersServices } from "../services/users.services";
import { User } from "../entities/user.entity";
import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { UpdateUserDto } from "../dtos/user/updateUser.dto";

export class UsersController {

  public static async getAll(req: Request, res: Response) {
    try {
      const users: User[] = await UsersServices.getAll();

      await ExpressHandlers.handleResponse(req, res, users);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id = (req.params.id);
      const user = await UsersServices.getById(id);

      await ExpressHandlers.handleResponse(req, res, user);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async create(req : Request, res : Response) {
    try {
      const user = new User(req.body);
      await UsersServices.create(user);

      await ExpressHandlers.handleResponse(req, res, user, "Usuário criado com sucesso!");
    } catch (error : any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async update(req : Request, res : Response) {
    try {
      const userDto = new UpdateUserDto(req.body, req.params.id);
      await UsersServices.update(userDto);
      const user = await UsersServices.getById(req.params.id);
      
      await ExpressHandlers.handleResponse(req, res, user, "Usuário editado com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}