import Config from './config';
import { makeEnum } from 'mediashare/core/utils/factory';

const userLevels = ['admin', 'free', 'subscriber'] as const;
export const userTypes = makeEnum(userLevels);

// @ts-ignore
export const userType = Config.BUILD_FOR || userTypes.admin;
// @ts-ignore
export const forFreeUser = userType === userTypes.free;
// @ts-ignore
export const forSubscriber = userType === userTypes.subscriber;
// @ts-ignore
export const forAdmin = userType === userTypes.admin;
