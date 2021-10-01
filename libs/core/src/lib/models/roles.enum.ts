import { ConfigEnum } from '../types/configEnum.type';

const BC_ROLES = ['guest', 'user', 'admin'] as const;

export type BcRolesType = ConfigEnum<typeof BC_ROLES>;
const [guest, user, admin] = BC_ROLES;

const bcRoles = { guest, user, admin } as const;

export { bcRoles, BC_ROLES };
