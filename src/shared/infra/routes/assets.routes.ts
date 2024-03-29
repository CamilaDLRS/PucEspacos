import express from "express"
import { AssetsController } from "../../../modules/controllers/assets.controller";


const assetRouter = express.Router();

assetRouter.get(
  "/",
  AssetsController.getAll
)

export default assetRouter;