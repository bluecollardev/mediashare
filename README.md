# Mediashare

This project was generated using [Nx](https://nx.dev).

## Running the api

The API is composed of a core API with routes on it, an Authentication microservice, a postgres Auth database and a mongodb database for core data.

To run the back-end components from the root enter `docker-compose build && docker-compose up`. To stop them run `docker-compose down`.

## Creating a new module

### command

Run `nest g resource resource-name` in the folder you want to insert it

choose `REST API` from the available options.

To extend the modules:

### Entity

Go to `entity/resource-name.entity.ts`

add teh @Entity() class decorator to the entity.

extend `BcBaseEntity<T>` with the current class type:

```js
import { Entity } from 'typeorm';
import { BcBaseEntity } from '@api';

@Entity()
export class Profile extends BcBaseEntity<Profile> {}
```

### Service

Go to to: `resource-name.service.ts`

Delete all the existing methods.

Extend the service to DataService. There are two generic types to add, the base Entity (ResourceName) and MongoRepository<UserName>:
`extends DataService<Profile, MongoRepository<Profile>>`

implement the constructor from with the appropriate injected service (see user.service.ts)

```js
 constructor(
  @InjectRepository(ResourceName)
  userRepository: MongoRepository<ResourceName>,
  logger: PinoLogger
) {
  super(userRepository, new ResourceBane(), logger);
}
```

### Controller

go to: `resource-name.controller.ts`

find all the +id in the service, and delete the `+`

### Module

Go to: `resource-name.module.ts`
s
add the module imports line:

```js

@Module[{
  ...
  imports: [..., ResourceNameModule],
  ...
}]

### Tests

follow the example in the user packages
```

If you get an error when nest starts one of the above steps was missed.

```javascript

@Module({
// this is the entity
imports: [TypeOrmModule.forFeature([ResourceName)]],
controllers: [ResourceNameController],
providers: [ResourceNameService],
})
export class ProfileModule {}


```

## App Module

go too `app.module` (located in the src root of the project)`

add the module to the list of imports there.

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
