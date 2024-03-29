import { Request, Response } from "express";
import { ApiResponse } from "../../shared/utils/apiResponse";
import { ApiError } from "./apiError";
import { InternalCode } from "../../shared/utils/internalCodes";

export class ExpressHandlers {
  public static async handleResponse(req: Request, res: Response, data: any, message? : string) {
    res.status(200).send(new ApiResponse(200, message, data));
  }

  public static async handleError(req: Request, res: Response, error: any) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error).send();
    } else {
      res.status(500).json(new ApiError(500, InternalCode.INTERNAL_ERROR, error));
    }
  }
}
