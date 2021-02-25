import { HttpException, HttpStatus } from '@nestjs/common';

function badRequest(error: string) {
  return new HttpException({ status: HttpStatus.BAD_REQUEST, error }, HttpStatus.BAD_REQUEST);
}

function notFoundRequest(item: string, opts?: { args?: any }) {
  const { args = null } = opts;
  return new HttpException(
    { status: HttpStatus.NOT_FOUND, error: `${item} was not found`, ...(args ?? args) },
    HttpStatus.NOT_FOUND
  );
}

export { badRequest, notFoundRequest };
