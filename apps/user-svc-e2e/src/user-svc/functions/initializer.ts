/* Ignore module boundaries, it's just our test scaffolding */
/* eslint-disable @nx/enforce-module-boundaries */
import { classes } from '@automapper/classes';
import { createMap, createMapper, Dictionary, forMember, ignore, Mapper, ModelIdentifier } from '@automapper/core';
import { createDB } from '@mediashare/user-svc/src/app/modules/user/user.service.spec';

export const initializeMapper = <E, D, C, U>(entity: E, dto: D, createDto: C, updateDto: U): Mapper => {
  const mapper = createMapper({ strategyInitializer: classes() });
  createMap(mapper, entity as ModelIdentifier<Dictionary<E>>, dto as ModelIdentifier<Dictionary<D>>);
  createMap(mapper, createDto as ModelIdentifier<Dictionary<C>>, entity as ModelIdentifier<Dictionary<E>>, forMember((dest) => dest['_id'], ignore()));
  createMap(mapper, updateDto as ModelIdentifier<Dictionary<U>>, entity as ModelIdentifier<Dictionary<E>>, forMember((dest) => dest['_id'], ignore()));
  return mapper;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeDB = async (entities: any[]) => {
  const db = await createDB([...entities]);
  await db.initialize();
  return db;
};
