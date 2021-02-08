import { Test, TestingModule } from '@nestjs/testing';
import { UserDataService } from './user-data.service';

describe('UserData', () => {
  let provider: UserDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDataService],
    }).compile();

    provider = module.get<UserDataService>(UserDataService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
