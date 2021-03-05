import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

/**
 * Return a new exception when the request is a bad request.
 *
 * @param {string} error
 * @return Http Exception with status of 400
 */
function badRequestResponse(error: string) {
  return new HttpException({ status: HttpStatus.BAD_REQUEST, error }, HttpStatus.BAD_REQUEST);
}

/**
 * Return a new exception when resource not found
 *
 * @param {string} entity
 * @param {{ args?: any }} [opts]
 * @return Http Exception with status of 404
 */
function notFoundResponse(entity: string, opts?: { args?: any }) {
  const { args = null } = opts;
  return new HttpException(
    { status: HttpStatus.NOT_FOUND, error: `${entity} was not found`, ...(args ?? args) },
    HttpStatus.NOT_FOUND
  );
}

function conflictResponse(id: string) {
  return new ConflictException(id, 'Resource already exists.');
}

export { badRequestResponse, notFoundResponse, conflictResponse };
