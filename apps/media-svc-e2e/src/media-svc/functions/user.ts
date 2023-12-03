/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { randomUUID } from 'crypto';
import { testAndCloneUser } from '../test-components';
import { defaultOptionsWithBearer } from './auth';
import { CreateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/create-user.dto';
import { UserDto } from '@mediashare/user-svc/src/app/modules/user/dto/user.dto';

export const createUser =
  ({ baseUrl, token }) =>
  (user) => {
    const dto = {
      sub: randomUUID(),
      ...user,
    } as CreateUserDto;

    return axios.post(`${baseUrl}/user`, dto, defaultOptionsWithBearer(token));
  };
export const createAndValidateTestUser = async (
  createUserFn,
  userData = {
    // Default data
    username: 'jsmith',
    email: 'jsmith@example.com',
    firstName: 'John',
    lastName: 'Smith',
  }
) => {
  return new Promise((resolve, reject) => {
    createUserFn(userData)
      .then((res) => {
        expect(res.status).toEqual(201);
        const user: UserDto = res.data;
        testAndCloneUser(user, userData);
        resolve(user);
      })
      .catch((err) => {
        expect(err).toBeDefined();
        reject(err);
      });
  });
};
export const getTestUserId = (testUser) => testUser._id.toString();
