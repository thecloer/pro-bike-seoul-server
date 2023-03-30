import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { statusCode: number; message: string | string[]; error: string };
    const result =
      typeof error === 'string'
        ? { success: false, url: request.url, statusCode, error }
        : { success: false, url: request.url, statusCode, ...error };

    console.log(request.query);

    return response.status(statusCode).json(result);
  }
}
