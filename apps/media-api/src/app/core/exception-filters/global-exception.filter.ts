import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method
  };
};


export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // TODO: We need to unit test the F*CK out of this! Also need to finish error handling...
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message;
    let code = 'HttpException';

    let status;
    let ex;
    let details;
    switch (exception.constructor) {
      case HttpException:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        ex = (exception as BadRequestException);
        details = ex.getResponse();
        message = `${ex.message}: ${Array.isArray(details.message) ? details.message.join('; ') : details.message}`;
        code = ex.code;
        status = ex.getStatus();
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);
        break;
      case BadRequestException:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        ex = (exception as BadRequestException);
        details = ex.getResponse();
        message = `${ex.message}: ${Array.isArray(details.message) ? details.message.join('; ') : details.message}`;
        code = ex.code;
        status = ex.getStatus();
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);
        break;
      case QueryFailedError:  // this is a TypeOrm error
        ex = (exception as QueryFailedError);
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = ex.message;
        code = ex.code;
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);
        break;
      case EntityNotFoundError:  // this is another TypeOrm error
        ex = (exception as EntityNotFoundError);
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = ex.message;
        code = ex.code;
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);
        break;
      case CannotCreateEntityIdMapError: // and another
        ex = (exception as CannotCreateEntityIdMapError);
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = ex.message;
        code = ex.code;
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR
        Logger.error(message, ex.stack, `${request.method} ${request.url}`);

    }

    response.status(status).json(GlobalResponseError(status, message, code, request));
  }
}
