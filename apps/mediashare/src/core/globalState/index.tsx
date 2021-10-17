import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';

import { useAppSelector } from '../../state';

export interface GlobalStateProps {
  loading?: boolean;
  isLoggedIn?: boolean;
  agreementAccepted?: boolean;
  history: any;
  location: any;
}

export const GlobalState = React.createContext<GlobalStateProps>({} as GlobalStateProps);

export const GlobalStateProvider = (WrappedComponent: any) => (props: any) => {
  // const { addToast, clearToast, toast } = useToast([])
  const { history, location } = props;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loading = useAppSelector((state) => state?.app.loading);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector((state) => state?.user);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsLoggedIn(user?._id?.length > 0);
  }, [user]);

  const providerValue = getProviderValue() as GlobalStateProps;
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
      search: {
        filters: {
          text: '',
        },
      },
    } as GlobalStateProps;
  }
};

// eslint-disable-next-line react/display-name
export const GlobalStateConsumer = (WrappedComponent: any) => (props) => (
  <GlobalState.Consumer>{(globalState) => <WrappedComponent {...props} globalState={globalState} />}</GlobalState.Consumer>
);

const withGlobalStateProvider = compose(GlobalStateProvider);
const withGlobalStateConsumer = GlobalStateConsumer;

export { withGlobalStateProvider, withGlobalStateConsumer };
