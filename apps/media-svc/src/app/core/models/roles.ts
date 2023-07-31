import { ConfigEnum } from '@mediashare/core/types';

// TODO: Dynamic roles?
const BC_ROLES = ['guest', 'free', 'subscriber', 'admin'] as const;

export type BcRolesType = ConfigEnum<typeof BC_ROLES>;
const [guest, free, subscriber, admin] = BC_ROLES;

const bcRoles = { guest, free, subscriber, admin } as const;

export { bcRoles, BC_ROLES };
