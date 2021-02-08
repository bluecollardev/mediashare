import { Test, TestingModule } from '@nestjs/testing';
import { AccountDataService } from './account-data.service';

describe('AccountDataService', () => {
  let service: AccountDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountDataService],
    }).compile();

    service = module.get<AccountDataService>(AccountDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
