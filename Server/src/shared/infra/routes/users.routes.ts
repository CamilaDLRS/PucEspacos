import express from "express";
import { UsersController } from "../../../modules/controllers/users.controller";
import { ValidationMiddleware } from "../../utils/validationMiddleware";
import { createUserSchema, signInUserSchema, updateUserSchema } from "../../../modules/schemas/user.schemas";

const usersRouter = express.Router();

usersRouter.get(
  "/signin",
  ValidationMiddleware.validateRequest(signInUserSchema),
  UsersController.signIn
);

usersRouter.get(
  "/:id",
  UsersController.getById
);

usersRouter.get(
  "/",
  UsersController.getAll
);

usersRouter.post(
  "/",
  ValidationMiddleware.validateRequest(createUserSchema),
  UsersController.create
);

usersRouter.patch(
  "/:id",
  ValidationMiddleware.validateRequest(updateUserSchema),
  UsersController.update
);

export default usersRouter;