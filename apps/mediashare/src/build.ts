import Config from 'react-native-config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SnakeCaseToCamelCase, snakeCaseToCamelCase } from './utils';

type EnumRecordType<S extends readonly string[]> = { [P in S[number] as SnakeCaseToCamelCase<P>]: P };
export const makeEnum = <T extends readonly string[]>(actions: T): EnumRecordType<T> =>
  actions.reduce((prev, curr) => ({ ...prev, [snakeCaseToCamelCase(curr)]: curr }), Object.create({}));

const userLevels = ['admin', 'free', 'subscriber'] as const;
export const userTypes = makeEnum(userLevels);

export const userType = userTypes.subscriber || Config.BUILD_FOR || userTypes.admin;
export const forFreeUser = userType === userTypes.free;
export const forSubscriber = userType === userTypes.subscriber;
export const forAdmin = userType === userTypes.admin;
