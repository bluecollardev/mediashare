import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const USER_CONTEXT_PROPERTY = 'user';

/**
 * Decorator that can be used to inject the cognito user into a controller.
 * @param {string} [propertyName] The name of the property to inject the user into.
 * @returns {(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => any}
 * @example @GetUser() user
 * @example @GetUser("username") username: string
 * @example @GetUser(["cognito:username", "email"]) { username, email }: { username: string, email: string }
 */
export const GetUser = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[USER_CONTEXT_PROPERTY];

    if (!data) {
      return user;
    }

    if (Array.isArray(data)) {
      return data.reduce((result, key) => {
        result[key] = user[key];
        return result;
      }, {});
    }

    return user[data];
  }
);
