/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { randomUUID } from 'crypto';
import { baseUrl } from '../constants';
import { defaultOptionsWithBearer } from './auth';
import { CreateUserDto } from '@mediashare/user-svc/src/app/modules/user/dto/create-user.dto';

export const createUser = (user) => {
  const dto = {
    sub: randomUUID(),
    ...user,
  } as CreateUserDto;

  return axios.post(`${baseUrl}/user`, dto, defaultOptionsWithBearer())
}
