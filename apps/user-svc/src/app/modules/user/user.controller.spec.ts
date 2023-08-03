import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { stub } from 'jest-auto-stub';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse
} from 'node-mocks-http';

const baseUrl = `http://localhost:3000/api`;
const ValidBearerToken = 'abc'

// TODO: These are basically useless tests right now, but we don't care too much
//  about isolated controller tests anyway, we barely do anything in the controllers.
describe('UserController.authorization', () => {
  let controller: UserController;
  let service: UserService;

  let req;
  let res;

  const mockUserService = stub<UserService>();

  beforeEach(async () => {
    res = createResponse();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it.skip('/POST authorize should validate a user session', async () => {
    req = createRequest({
      method: 'GET',
      url: `${baseUrl}/`,
      headers: {
        'authorization': `bearer ${ValidBearerToken}`
      }
    });
    const user = {};
    const result = await controller.authorize(user, req, res);
    expect(result).toBeDefined();
    console.log(result);
  });

  it.skip('POST /invite should do its job', async () => {
    req = createRequest({
      method: 'GET',
      url: `${baseUrl}/`,
      headers: {
        'authorization': `bearer ${ValidBearerToken}`
      }
    });
    const user = {};
    const result = await controller.authorize(user, req, res);
    expect(result).toBeDefined();
    console.log(result);
  });

  it.skip('POST /logout should do its job', async () => {
    req = createRequest({
      method: 'POST',
      url: `${baseUrl}/`,
      headers: {
        'authorization': `bearer ${ValidBearerToken}`
      }
    });
    const user = {};
    const result = await controller.authorize(user, req, res);
    expect(result).toBeDefined();
    console.log(result);
  });
});


describe('UserController.crud', () => {
  let controller: UserController;
  let service: UserService;

  let req;
  let res;

  const mockUserService = stub<UserService>();

  beforeEach(async () => {
    res = createResponse();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
  });

  it.skip('GET /user  should do its job', async () => {
    req = createRequest({
      method: 'GET',
      url: `${baseUrl}/`,
      headers: {
        'authorization': `bearer ${ValidBearerToken}`
      }
    });

    const result = await controller.getUser(res, 'abc');
    expect(result).toBeDefined();
    console.log(result);
  });

  it.skip('PUT /user should do its job', async () => {
    req = createRequest({
      method: 'GET',
      url: `${baseUrl}/`,
      headers: {
        'authorization': `bearer ${ValidBearerToken}`
      }
    });

    const data = {
      _id: '649bf1b109d28ad4892f1548',
      sub: '33a08148-b658-403d-b070-cdc0f34e5274',
      username: 'demosubscriber',
      firstName: 'Lucas',
      lastName: 'Lopatka',
      email: 'lucaslopatka@gmail.com',
      phoneNumber: null,
      role: 'subscriber',
      imageSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/assets/default-user.png',
      isDisabled: false,
      transactionId: '12345',
      transactionDate: '2023-06-28T08:39:13.264Z',
      transactionEndDate: '2023-06-28T08:39:13.264Z',
      createdAt: new Date('2023-06-28T08:39:13.264Z'),
      updatedDate: new Date('2023-06-28T08:39:13.264Z'),
    } as UpdateUserDto;

    const result = await controller.updateUser(res, '649bf1b109d28ad4892f1548', data);
    expect(result).toBeDefined();
    console.log(result);
  });
});

