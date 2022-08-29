import { useEffect, useState } from 'react';
import { useAppSelector } from 'mediashare/store';
import { DEFAULT_USER_ROLE } from 'mediashare/core/globalState';
import { BcRolesType } from 'mediashare/rxjs-api';

export function useUser() {
  const user = useAppSelector((state) => state?.user?.entity);
  const role = useAppSelector((state) => state?.user?.entity?.role) || DEFAULT_USER_ROLE;

  // TODO: If dynamic roles are implemented, update this
  const roles = [role].filter((r) => !!r);
  const authenticatedAndLoggedIn = user?._id?.length > 0;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticatedAndLoggedIn);
  const [build, setBuild] = useState({
    forFreeUser: false,
    forSubscriber: false,
    forAdmin: false,
  });

  useEffect(() => {
    let mount = true;
    if (authenticatedAndLoggedIn) {
      console.log('[useUser] authenticatedAndLoggedIn is true, run setIsLoggedIn effect');
      if (mount) {
        setBuild({
          // TODO: Guest is just for unregistered users... we can update this later
          forFreeUser: roles.includes(BcRolesType.Guest) || roles.includes(BcRolesType.Free),
          forSubscriber: roles.includes(BcRolesType.Subscriber),
          forAdmin: roles.includes(BcRolesType.Admin),
        });
        setIsLoggedIn(authenticatedAndLoggedIn);
      }
    }
    return () => {
      mount = false;
    };
  }, [authenticatedAndLoggedIn]);

  return {
    ...user,
    roles,
    isLoggedIn,
    build,
  };
}
