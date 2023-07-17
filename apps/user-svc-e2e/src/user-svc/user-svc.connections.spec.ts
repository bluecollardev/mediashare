/* Ignore module boundaries, it's just our test scaffolding */
import { ApiErrorResponse } from '@mediashare/user-svc/src/app/core/errors/api-error';
/* eslint-disable @nx/enforce-module-boundaries */
import axios, { AxiosError } from 'axios';
import { Mapper } from '@automapper/core';
import { stub } from 'jest-auto-stub/src/index';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, MongoRepository } from 'typeorm';
import { clone } from 'remeda';

import { baseUrl } from './constants';
import { allValidations } from './fixtures/validations';
import { defaultOptionsWithBearer } from './functions/auth';
import { initializeDB, initializeMapper } from './functions/initializer';

import { CreateUserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/update-user-connection.dto';
import { UserConnectionDto } from '@mediashare/user-svc/src/app/modules/user-connection/dto/user-connection.dto';
import { UserConnection } from '@mediashare/user-svc/src/app/modules/user-connection/entities/user-connection.entity';
import { UserConnectionDataService, UserConnectionService } from '@mediashare/user-svc/src/app/modules/user-connection/user-connection.service';

describe('UserAPI.connections.e2e', () => {
  let db: DataSource;
  let userConnectionService: UserConnectionService;
  let userConnectionRepository: MongoRepository<UserConnection>;
  let userConnectionDataService: UserConnectionDataService;
  let mapper: Mapper;

  beforeAll(async () => {
    const logger = stub<PinoLogger>();
    mapper = initializeMapper(UserConnection, UserConnectionDto, CreateUserConnectionDto, UpdateUserConnectionDto);
    db = await initializeDB([UserConnection]);

    userConnectionRepository = await db.getMongoRepository(UserConnection);
    userConnectionDataService = new UserConnectionDataService(userConnectionRepository, logger)
    userConnectionService = new UserConnectionService(userConnectionDataService, mapper, logger);

    // Delete all test records
    await userConnectionRepository.deleteMany({});
  });

  afterAll(async () => {
    await db.close();
  });

  describe('UserConnectionApi validation', () => {
    it('it should return the correct validation errors', async () => {
      const dto = {
        userId: null,
        connectionId: null
      };

      await axios.post(`${baseUrl}/user/connections/create`, dto, defaultOptionsWithBearer())
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


  describe('UserConnectionApi should create, find and delete a new user connection', () => {
    let createdUserConnectionId;
    let createdUserConnection: UserConnectionDto;

    it('it should create a new user connection', async () => {
      const dto = {
        userId: new ObjectId(),
        connectionId: new ObjectId()
      } as CreateUserConnectionDto;

      await axios.post(`${baseUrl}/user/connections/create`, dto, defaultOptionsWithBearer())
        .then((res) => {
          expect(res.status).toEqual(201);

          const uc: UserConnectionDto = res.data;
          expect(uc._id).toBeDefined();
          // Save created user to test suite for the remaining tests
          createdUserConnectionId = uc._id;
          createdUserConnection = clone(uc);

          expect(uc.userId).toBeDefined();
          expect(uc.connectionId).toBeDefined();
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should get the user connection we created', async () => {
      const userId = createdUserConnection.userId.toString();
      await axios.get(`${baseUrl}/user/connections/${userId}`, defaultOptionsWithBearer())
        .then((res) => {
          expect(res.status).toEqual(200);

          /* const uc: UserConnectionDto = res.data;
          expect(uc._id).toBeDefined();
          expect(uc.userId).toBeDefined();
          expect(uc.connectionId).toBeDefined(); */
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should get all the user connections for a user', async () => {
      const userId = createdUserConnection.userId.toString();
      await axios.get(`${baseUrl}/user/connections/${userId}`, defaultOptionsWithBearer())
        .then((res) => {
          expect(res.status).toEqual(200);

          /* const uc: UserConnectionDto = res.data;
          expect(uc._id).toBeDefined();
          expect(uc.userId).toBeDefined();
          expect(uc.connectionId).toBeDefined(); */
        })
        .catch((err) => {
          throw err;
        });
    });

    /* it('should delete the user connection we created', async () => {
      await axios.delete(`${baseUrl}/connection/remove/${createdUserConnectionId}`, defaultOptionsWithBearer())
        .then((res) => {
          // TODO: Make response 204 if no content
          expect(res.status).toEqual(200);
        });
    }); */
  });
});
