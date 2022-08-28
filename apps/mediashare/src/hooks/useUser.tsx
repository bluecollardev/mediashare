import { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from 'mediashare/store';
import { DEFAULT_USER_ROLE } from 'mediashare/core/globalState';
import { BcRolesType } from 'mediashare/rxjs-api';
import { Auth } from 'aws-amplify';
import { loginAction } from 'mediashare/store/modules/user';
import { useDispatch } from 'react-redux';

export function useUser() {
  const user = useAppSelector((state) => state?.user?.entity);
  const role = useAppSelector((state) => state?.user?.entity?.role) || DEFAULT_USER_ROLE;

  // TODO: If dynamic roles are implemented, update this
  const roles = [role].filter((r) => !!r);
  const authenticatedAndLoggedIn = user?._id?.length > 0;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticatedAndLoggedIn);
  const [isCurrentUser, setIsCurrentUser] = useState(undefined);
  const [build, setBuild] = useState({
    forFreeUser: false,
    forSubscriber: false,
    forAdmin: false,
  });
  const dispatch = useDispatch();

  
  useEffect(() => {
    let mount = true;
    if (authenticatedAndLoggedIn) {
      console.log('[useUser] authenticatedAndLoggedIn is true, run setIsLoggedIn effect', authenticatedAndLoggedIn);
      if (mount) {
        setIsLoggedIn(authenticatedAndLoggedIn);
        setBuild({
          // TODO: Guest is just for unregistered users... we can update this later
          forFreeUser: roles.includes(BcRolesType.Guest) || roles.includes(BcRolesType.Free),
          forSubscriber: roles.includes(BcRolesType.Subscriber),
          forAdmin: roles.includes(BcRolesType.Admin),
        });
      }
    }

    const fetchData = async () => {
      const authUser = await Auth.currentUserPoolUser();
      if (mount) {
        dispatch(loginAction({ accessToken: authUser.signInUserSession.accessToken.jwtToken, idToken: authUser.signInUserSession.idToken.jwtToken}));
        setIsCurrentUser(authUser);
      }
    }
  
    fetchData().catch((error) => {
      if(mount) {
        setIsCurrentUser(null);
      }
    });
    
    return () => {
      setIsCurrentUser(null);
      mount = false;
    };
  }, [authenticatedAndLoggedIn]);

  return {
    ...user,
    roles,
    isLoggedIn,
    build,
    setIsLoggedIn,
    isCurrentUser,
  };
}
