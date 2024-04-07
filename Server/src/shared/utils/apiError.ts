import { ApiResponse } from "./apiResponse";
import { ErrorMessage, InternalCode } from "./internalCodes";

export class ApiError<T> extends ApiResponse<T> {
  error: {
    internalCode: InternalCode;
    message: string;
    data?: any;
  };

  constructor(statusCode: number, internalCode: InternalCode, data?: any | null,  message?: string | null) {
    super(statusCode);
    this.success = false;

    this.error = {
      internalCode,
      message: message || ErrorMessage[internalCode]
    }
    this.error.data = data || null;
  }
}