import { useEffect, useState } from 'react';
import { useAppSelector } from 'mediashare/store';
import { DEFAULT_USER_ROLE } from 'mediashare/core/globalState';
import { BcRolesType } from 'mediashare/rxjs-api';

export function useProfile() {
  const profile = useAppSelector((state) => state?.profile?.entity);
  const role = useAppSelector((state) => state?.profile?.entity?.role) || DEFAULT_USER_ROLE;

  // TODO: If dynamic roles are implemented, update this
  const roles = [role].filter((r) => !!r);
  const [build, setBuild] = useState({
    forFreeUser: false,
    forSubscriber: false,
    forAdmin: false,
  });

  useEffect(() => {
    if (profile) {
      setBuild({
        // TODO: Guest is just for unregistered users... we can update this later
        forFreeUser: roles.includes(BcRolesType.Guest) || roles.includes(BcRolesType.Free),
        forSubscriber: roles.includes(BcRolesType.Subscriber),
        forAdmin: roles.includes(BcRolesType.Admin),
      });
    }
  }, [profile]);

  return {
    ...profile,
    roles,
    build,
  };
}
