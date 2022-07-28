import { Test, TestingModule } from '@nestjs/testing';
import { UserConnectionController } from './user-connection.controller';
import { UserConnectionService } from './user-connection.service';

describe('UserConnectionController', () => {
  let controller: UserConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserConnectionController],
      providers: [UserConnectionService],
    }).compile();
    controller = module.get<UserConnectionController>(UserConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
