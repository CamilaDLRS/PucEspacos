import express from "express";
import { UsersController } from "../../../modules/controllers/users.controller";

const usersRouter = express.Router();

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
  UsersController.create
);

usersRouter.patch(
  "/:id",
  UsersController.update
);

export default usersRouter;
