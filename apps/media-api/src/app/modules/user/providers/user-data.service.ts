// import { Inject, Injectable } from '@nestjs/common';

// import { User, Account } from '@core-lib';
// import {
//   DatabaseCollectionType,
//   DatabaseService,
// } from '../../../../core/providers/database/database.service';
// import { MsDataProvider } from '../../../../core/models/data-provider.model';

// @Injectable()
// export class UserDataService implements MsDataProvider<User> {
//   constructor(
//     @Inject('USER_COLLECTION') private collection: DatabaseCollectionType,
//     private dbSvc: DatabaseService
//   ) {
//     if (!collection)
//       throw new Error(
//         `${this.constructor.name} is missing collection in implementation`
//       );
//   }

//   create(user: Partial<User>) {
//     const { accounts = [] } = user;

//     const collection = this.collection;

//     if (!accounts || accounts.length < 1)
//       throw new Error(`no accounts added to ${this.constructor.name}.create`);

//     return this.dbSvc.insertRecord({ collection, record: { accounts } });
//   }

//   get(id: string) {
//     const collection = this.collection;

//     return this.dbSvc.getRecord({ collection, id });
//   }

//   update(args: { uid: string; id: string }) {
//     const { id, uid } = args;
//     const collection = this.collection;

//     return this.dbSvc.updateRecord<User>({
//       collection,
//       id,
//       query: { uid },
//     });
//   }
// }
