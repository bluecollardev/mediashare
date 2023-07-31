/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import { INestApplication } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Mapper } from '@automapper/core';
import { stub } from 'jest-auto-stub/src/index';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, MongoRepository } from 'typeorm';

import { getBaseUrl, initializeApp, initializeDB, initializeMapper } from './functions/app';
import { defaultOptionsWithBearer, login } from './functions/auth';
import { createUser as createUserFunction } from './functions/user';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { ApiErrorResponse } from '@mediashare/core/errors/api-error';
import { CreateUserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/update-user-connection.dto';
import { UserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/user-connection.dto';
import { UserConnection } from '@mediashare/user-svc/src/app/modules/user-connection/entities/user-connection.entity';
import { UserConnectionDataService, UserConnectionService } from '@mediashare/user-svc/src/app/modules/user-connection/user-connection.service';
import { User } from '@mediashare/user-svc/src/app/modules/user/entities/user.entity';
import { UserDto } from '@mediashare/user-svc/src/app/modules/user/dto/user.dto';

describe('UserAPI.connections.e2e', () => {
  let app: INestApplication;
  let baseUrl: string;

  let db: DataSource;
  let userConnectionService: UserConnectionService;
  let userConnectionRepository: MongoRepository<UserConnection>;
  let userConnectionDataService: UserConnectionDataService;
  let userRepository: MongoRepository<User>;
  let mapper: Mapper;
  let authResponse: AuthenticationResultType
  let createUser;

  let user;
  let conn1;
  let conn2;

  beforeAll(async () => {
    const globalPrefix = 'api'
    app = await initializeApp(globalPrefix);
    baseUrl = await getBaseUrl(app, globalPrefix);

    const logger = stub<PinoLogger>();
    mapper = initializeMapper(UserConnection, UserConnectionDto, CreateUserConnectionDto, UpdateUserConnectionDto);
    db = await initializeDB([User, UserConnection]);

    userRepository = await db.getMongoRepository(User);
    userConnectionRepository = await db.getMongoRepository(UserConnection);
    userConnectionDataService = new UserConnectionDataService(userConnectionRepository, logger)
    userConnectionService = new UserConnectionService(userConnectionDataService, mapper, logger);

    // Delete all test records
    await userRepository.deleteMany({});
    await userConnectionRepository.deleteMany({});

    const creds = {
      username: process.env.COGNITO_USER_EMAIL,
      password: process.env.COGNITO_USER_PASSWORD,
      clientId: process.env.COGNITO_CLIENT_ID || '1n3of997k64in850vgp1hn849v',
    };
    authResponse = await login(baseUrl, creds);
    console.log(`Logged in`, authResponse);

    createUser = createUserFunction({ baseUrl, token: authResponse?.IdToken });

    // Create some users for our test
    user = (await createUser({
      username: 'jsmith',
      email: 'jsmith@example.com',
      firstName: 'John',
      lastName: 'Smith',
    })).data;

    conn1 = (await createUser({
      username: 'ryanjohnson',
      email: 'ryanj@example.com',
      firstName: 'Ryan',
      lastName: 'Johnson',
    })).data;

    conn2 = (await createUser({
      username: 'barbs',
      email: 'barbs@example.com',
      firstName: 'Barbra',
      lastName: 'Streisand',
    })).data;
  });

  afterAll(async () => {
    // await app.close();
    await db.close();
  });

  describe('UserConnectionApi validation', () => {
    it('should return the correct validation errors', async () => {
      const dto = {
        userId: null,
        connectionId: null
      };

      await axios.post(`${baseUrl}/user/connections/create`, dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .catch((res: AxiosError) => {
          const {
            code,
            displayMessage,
            additionalMessages,
          }: ApiErrorResponse = res.response.data as ApiErrorResponse;
          expect(res.response.status).toEqual(422);
          expect(code).toEqual('ValidationError');
          expect(displayMessage).toEqual('Validation failed');
          expect(additionalMessages).toBeInstanceOf(Array);

          const validationMessages = [
            {
              "target": {
                "userId": null,
                "connectionId": null
              },
              "value": null,
              "property": "userId",
              "children": [],
              "constraints": {
                "isDefined": "userId should not be null or undefined",
                "isMongoId": "userId must be a mongodb id"
              }
            },
            {
              "target": {
                "userId": null,
                "connectionId": null
              },
              "value": null,
              "property": "connectionId",
              "children": [],
              "constraints": {
                "isDefined": "connectionId should not be null or undefined",
                "isMongoId": "connectionId must be a mongodb id"
              }
            }
          ];
          expect(JSON.stringify(additionalMessages))
            .toEqual(JSON.stringify(validationMessages));
        });
    });
  });

  let uc1Id: ObjectId;
  let uc2Id: ObjectId;

  describe('UserConnectionApi should create a first user connection', () => {
    it('should create a first user connection', async () => {
      const uc1dto = {
        userId: user._id,
        connectionId: conn1._id,
      } as CreateUserConnectionDto;

      // Create user connection 1
      await axios.post(`${baseUrl}/user/connections/create`, uc1dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(201);

          const uc: UserConnectionDto = res.data;
          expect(uc._id).toBeDefined();
          // Save created user to test suite for the remaining tests
          uc1Id = uc._id;

          expect(uc.userId).toEqual(user._id);
          expect(uc.connectionId).toEqual(conn1._id);
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('UserConnectionApi should create a second user connection', () => {
    it('should create a second user connection', async () => {
      // Create user connection 2
      const uc2dto = {
        userId: user._id,
        connectionId: conn2._id,
      } as CreateUserConnectionDto;

      await axios.post(`${baseUrl}/user/connections/create`, uc2dto, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(201);

          const uc: UserConnectionDto = res.data;
          expect(uc._id).toBeDefined();
          // Save created user to test suite for the remaining tests
          uc2Id = uc._id;

          expect(uc.userId).toEqual(user._id);
          expect(uc.connectionId).toEqual(conn2._id);
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('UserConnectionApi should get the two user connections we created', () => {
    it('should get the two user connections we created', async () => {
      await axios.get(`${baseUrl}/user/connections/${user._id.toString()}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          expect(res.status).toEqual(200);
          const users: UserDto[] = res.data as UserDto[];
          expect(users).toBeInstanceOf(Array);
          expect(users).toHaveLength(2);
          const uc1 = users.find((u) => u._id.toString() === conn1._id.toString());
          const uc2 = users.find((u) => u._id.toString() === conn2._id.toString());
          expect(uc1._id).toEqual(conn1._id);
          expect(uc2._id).toEqual(conn2._id);
        })
        .catch((err) => {
          throw err;
        });
    });

    /* it('should delete the user connection we created', async () => {
      await axios.delete(`${baseUrl}/connection/remove/${createdUserConnectionId}`, defaultOptionsWithBearer(authResponse?.IdToken))
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    }); */
  });
});
