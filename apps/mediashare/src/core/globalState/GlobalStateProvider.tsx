import React, { useEffect, useState } from 'react';
import { GlobalState, GlobalStateProviderProps } from './index';

import { useAppSelector } from '../../state';

// eslint-disable-next-line react/display-name
export const GlobalStateProvider = (WrappedComponent: any) => (props: any) => {
  // const { addToast, clearToast, toast } = useToast([])
  const { history, location } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loading = useAppSelector((state) => state?.app.loading);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector((state) => state?.user);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsLoggedIn(user?._id?.length > 0);
  }, [user]);

  const providerValue = getProviderValue() as GlobalStateProviderProps;
  return (
    <GlobalState.Provider value={providerValue}>
      <WrappedComponent {...props} globalState={providerValue} />
    </GlobalState.Provider>
  );

  function getProviderValue() {
    return {
      history,
      location,
      loading,
      isLoggedIn,
    } as GlobalStateProviderProps;
  }
};
