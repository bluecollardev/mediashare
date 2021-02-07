import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('URI') private uri: string,
    @Inject('DB_NAME') private dbName: string
  ) {}
}
