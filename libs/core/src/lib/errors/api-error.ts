import { HttpStatus } from '@nestjs/common';

export interface ApiError {
  code: ApiErrorCodes;
  httpCode: number;
  message: string;
  displayMessage?: string;
  additionalMessages?: string[] | object[];
}

export enum ApiErrorCodes {
  ValidationError = 'ValidationError',
}

export const ApiErrorResponses: Record<ApiErrorCodes, (errors) => ApiError> = {
  [ApiErrorCodes.ValidationError]: ({ errors }) => ({
    code: ApiErrorCodes.ValidationError,
    httpCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: `Validation failed`,
    additionalMessages: errors,
  }),
};

export const ApiErrorResponseName = 'ApiErrorResponse';

export class ApiErrorResponse extends Error implements ApiError {
  public code: ApiErrorCodes;
  public httpCode: number;
  public message: string;
  public displayMessage?: string;
  public additionalMessages?: string[] | object[];

  constructor(args: ApiError) {
    super(args.message);
    // Hack around broken instanceof in TypeScript
    Object.setPrototypeOf(this, ApiErrorResponse);
    this.code = args.code;
    this.httpCode = args.httpCode;
    this.message = args.message;
    this.displayMessage = args.displayMessage || args.message;
    this.additionalMessages = args.additionalMessages;
  }
}
