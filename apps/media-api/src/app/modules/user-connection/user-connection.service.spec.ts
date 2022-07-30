import { Test, TestingModule } from '@nestjs/testing';
import { UserConnectionService } from './user-connection.service';

describe('UserConnectionService', () => {
  let service: UserConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConnectionService],
    }).compile();

    service = module.get<UserConnectionService>(UserConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
