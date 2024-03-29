import express from "express";
import { UsersController } from "../../../modules/controllers/users.controller";

const userRouter = express.Router();

userRouter.get(
  "/:id",
  UsersController.getById
);

userRouter.get(
  "/",
  UsersController.getAll
);

userRouter.post("/", (req, res) => {
  res.send("CREATE!");
});

userRouter.put("/", (req, res) => {
  res.send("EDIT!");
});

export default userRouter;
