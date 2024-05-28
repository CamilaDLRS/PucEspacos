import { Request, Response } from "express";
import { UsersServices } from "../services/users.services";
import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { UserDto } from "../dtos/user.dto";
import { UserType } from "../enums/userType.enum";

export class UsersController {

  public static async getAll(req: Request, res: Response) {
    try {
      const users: UserDto[] = await UsersServices.getAll();

      await ExpressHandlers.handleResponse(req, res, users);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getAllTypes(req: Request, res: Response) {
    try {
      const userTypes: string[] = Object.values(UserType);

      await ExpressHandlers.handleResponse(req, res, userTypes);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id: string = (req.params.id);
      const user: UserDto = await UsersServices.getById(id);

      await ExpressHandlers.handleResponse(req, res, user);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async signIn(req: Request, res: Response) {
    try {
      const email: string = String(req.query.email);
      const password: string = String(req.query.password);

      const user: UserDto = await UsersServices.signIn(email, password);

      await ExpressHandlers.handleResponse(req, res, user, "Login realizado com sucesso!");
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      let user: UserDto = new UserDto(req.body);
      const newUserId = await UsersServices.create(user);
      user = await UsersServices.getById(newUserId);

      await ExpressHandlers.handleResponse(req, res, user, "Usuário criado com sucesso!");
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      let user: UserDto = new UserDto(req.body, req.params.id);
      let requestingUserId = String(req.query.requestingUserId);

      await UsersServices.update(user, requestingUserId);
      user = await UsersServices.getById(req.params.id);

      await ExpressHandlers.handleResponse(req, res, user, "Usuário editado com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}