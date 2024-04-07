import express from "express"
import { AssetsController } from "../../../modules/controllers/assets.controller";

const assetsRouter = express.Router();

assetsRouter.get(
  "/",
  AssetsController.getAll
);

export default assetsRouter;