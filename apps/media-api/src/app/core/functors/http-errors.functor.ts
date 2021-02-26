import { HttpException, HttpStatus } from '@nestjs/common';

function badRequest(error: string) {
  return new HttpException({ status: HttpStatus.BAD_REQUEST, error }, HttpStatus.BAD_REQUEST);
}

/**
 * return a new exception when resource not found
 *
 * @param {string} entity
 * @param {{ args?: any }} [opts]
 * @return {*}
 */
function notFoundRequest(entity: string, opts?: { args?: any }) {
  const { args = null } = opts;
  return new HttpException(
    { status: HttpStatus.NOT_FOUND, error: `${entity} was not found`, ...(args ?? args) },
    HttpStatus.NOT_FOUND
  );
}

export { badRequest, notFoundRequest };
