import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiErrorCodes,
  ApiErrorResponse,
  ApiErrorResponseName,
} from '../errors/api-error';

export const handleSuccessResponse = (res: Response, statusCode, body) => {
  return res.status(statusCode || HttpStatus.OK).json(body);
};

export type ApiErrorResponseType = ApiErrorResponse;

export const handleErrorResponse = (res: Response, err) => {
  if (err.name !== ApiErrorResponseName) throw err;
  if (err.code === ApiErrorCodes.ValidationError) {
    const apiError: ApiErrorResponse = err as ApiErrorResponse;
    return res.status(apiError.httpCode).json(err);
  }
};
