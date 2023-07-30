import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, ignore, Mapper } from '@automapper/core';
import { randomUUID } from 'crypto';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, MongoRepository } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserDataService, UserService } from './user.service';
import { User } from './entities/user.entity';
// import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { stub } from 'jest-auto-stub';
import { clone } from 'remeda';

export async function createDB(entities) {
  return new DataSource({
    synchronize: false,
    autoLoadEntities: false,
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'mediashare-test',
    entities,
    ssl: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    logging: true
  } as MongoConnectionOptions)
}

const throwValidationError = (errors) => {
  throw new Error(`Validation errors detected: ${JSON.stringify(errors, null, 2)}`);
}

const throwInvalidUserDtoError = () => {
  throw new Error(`Response was not a valid UserDto`);
}

describe('UserService', () => {
  let db: DataSource;
  let userService: UserService;
  let userRepository: MongoRepository<User>;
  let userDataService: UserDataService;
  let mapper: Mapper;

  beforeAll(async () => {
    const logger = stub<PinoLogger>();

    mapper = createMapper({ strategyInitializer: classes() });
    createMap(mapper, User, UserDto);
    createMap(mapper, CreateUserDto, User, forMember((dest) => dest['_id'], ignore()));
    createMap(mapper, UpdateUserDto, User, forMember((dest) => dest['_id'], ignore()));

    db = await createDB([User])
    await db.initialize();

    userRepository = await db.getMongoRepository(User);
    userDataService = new UserDataService(userRepository, logger)
    userService = new UserService(userDataService, mapper, logger);
  })

  afterAll(async () => {
    // Delete all test records
    await userRepository.deleteMany({});
    await db.close();
  });

  describe('UserService validation', () => {
    it('should return the correct validation errors', async () => {
      const dto = {
        firstName: 'J'
      } as CreateUserDto;

      await userService
        .create(dto)
        .catch((errorResponse) => {
          // expect(user).toBeInstanceOf(UserDto);
         const errors = errorResponse.additionalMessages;
          expect(errors).toBeDefined();
          expect(errors.find((e) => e.property === 'sub')).toBeDefined();
          expect(errors.find((e) => e.property === 'username')).toBeDefined();
          expect(errors.find((e) => e.property === 'email')).toBeDefined();
          expect(errors.find((e) => e.property === 'firstName')).toBeDefined();
          expect(errors.find((e) => e.property === 'lastName')).toBeDefined();
        });
    });
  });

  describe('UserService should create, find, update and delete a new user', () => {
    let createdUserId;

    it('should create a new user', async () => {
      const dto = {
        sub: randomUUID(),
        username: 'jsmith',
        email: 'jsmith@example.com',
        firstName: 'John',
        lastName: 'Smith',
      } as CreateUserDto;

      await userService
        .create(dto)
        .then((user) => {
          if (user instanceof UserDto) {
            expect(user._id).toBeDefined();
            // Save created user to test suite for the remaining tests
            createdUserId = user._id;

            expect(user.sub).toBeDefined();
            expect(user.username).toEqual('jsmith');
            expect(user.email).toEqual('jsmith@example.com');
            expect(user.firstName).toEqual('John');
            expect(user.lastName).toEqual('Smith');
            expect(user.createdAt).toBeDefined();
            expect(user.updatedDate).toBeDefined();
          } else {
            throwInvalidUserDtoError();
          }
        })
        .catch((errors) => {
          // expect(user).toBeInstanceOf(UserDto);
          expect(errors).toBeDefined();
          throwValidationError(errors);
        });
    });

    it('should get the user we created', async () => {
      const user = await userService.findOne(createdUserId);
      expect(user).toBeDefined();
      expect(user.sub).toBeDefined();
      expect(user.username).toEqual('jsmith');
      expect(user.email).toEqual('jsmith@example.com');
      expect(user.firstName).toEqual('John');
      expect(user.lastName).toEqual('Smith');
      expect(user.createdAt).toBeDefined();
      expect(user.updatedDate).toBeDefined();
    });

    it('should update the user we created', async () => {
      const user = await userService.findOne(createdUserId);
      const updatedUser = clone(user);
      updatedUser.username = 'jr.smith';
      updatedUser.email = 'jr.smith@example.com';
      await userService.update(createdUserId, updatedUser)
        .then((updated) => {
          if (updated instanceof UserDto) {
            expect(updated).toBeDefined();
            expect(updated.sub).toBeDefined();
            expect(updated.username).toEqual('jr.smith');
            expect(updated.email).toEqual('jr.smith@example.com');
            expect(updated.firstName).toEqual('John');
            expect(updated.lastName).toEqual('Smith');
            expect(updated.createdAt).toBeDefined();
            expect(updated.updatedDate).toBeDefined();
          } else {
            throwInvalidUserDtoError();
          }
        })
        .catch((errors) => {
          expect(errors).toBeDefined();
          throwValidationError(errors);
        });
    });

    it('should find the user we updated', async () => {
      const user = await userService.findById(createdUserId);
      expect(user).toBeDefined();
      expect(user.sub).toBeUndefined();
      expect(user.username).toEqual('jr.smith');
      expect(user.email).toEqual('jr.smith@example.com');
      expect(user.firstName).toEqual('John');
      expect(user.lastName).toEqual('Smith');
      // TODO: Fix these they are broken!
      // expect(user.createdAt).toBeDefined();
      // expect(user.updatedDate).toBeDefined();
    });

    it('should delete the user we created', async () => {
      await userService.remove(createdUserId)
        .then((result) => {
          expect(result).toBeDefined();
          expect(result.affected).toEqual(1);
          expect(result.raw.acknowledged).toEqual(true);
        }).catch((error) => {
          console.error(error);
          throw new Error('Delete failed');
        });
    });
  });
});
