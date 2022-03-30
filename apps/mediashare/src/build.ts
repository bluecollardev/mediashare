import Config from './config';
import { makeActions } from 'mediashare/store/factory';

const userLevels = ['admin', 'free', 'subscriber'] as const;
export const userTypes = makeActions(userLevels);

// @ts-ignore
export const userType = Config.BUILD_FOR || userTypes.admin;
// @ts-ignore
export const forFreeUser = userType === userTypes.free;
// @ts-ignore
export const forSubscriber = userType === userTypes.subscriber;
// @ts-ignore
export const forAdmin = userType === userTypes.admin;
