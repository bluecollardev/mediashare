import { Test, TestingModule } from '@nestjs/testing';
import { UserConnectionService } from './user-connection.service';

// TODO: These tests don't do anything right now
describe('UserConnectionService', () => {
  let service: UserConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConnectionService],
    }).compile();

    service = module.get(UserConnectionService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
