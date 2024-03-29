export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data?: T;
  message?: string;

  constructor(statusCode: number,  message?: string, data?: T) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}