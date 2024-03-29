import { Request, Response } from "express";
import { UsersServices } from "../services/users.services";
import { User } from "../entities/user.entity";
import { ExpressHandlers } from "../../shared/utils/expressHandles";

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

  public static async createUser(req : Request, res : Response) {
    try {
      const user = User.fromBody(req.body);
      await UsersServices.createUser(user);
      await ExpressHandlers.handleResponse(req, res, user, "Usuário criado com sucesso!");
    } catch (error : any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}