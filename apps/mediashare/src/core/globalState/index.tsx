import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';

import { useAppSelector } from '../../store';

export interface GlobalStateProps {
  loading?: boolean;
  isLoggedIn?: boolean;
  history?: any;
  location?: any;
  search?: any;
  setSearchFilters?: Function;
}

export const GlobalState = React.createContext<GlobalStateProps>({} as GlobalStateProps);

export const INITIAL_SEARCH_FILTERS = {
  text: '',
};

export const GlobalStateProviderWrapper = (WrappedComponent: any) => {
  return function GlobalStateProvider(props: any) {
    const { history, location } = props;
    console.log('GlobalStateProvider props');
    console.log(props);

    const loading = useAppSelector((state) => state?.app.loading);
    const user = useAppSelector((state) => state?.user);
    const authenticatedAndLoggedIn = user?._id?.length > 0;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticatedAndLoggedIn);
    const [searchFilters, setSearchFilters] = useState(INITIAL_SEARCH_FILTERS);

    useEffect(() => {
      if (authenticatedAndLoggedIn) {
        console.log('authenticatedAndLoggedIn is true, run setIsLoggedIn effect');
        setIsLoggedIn(authenticatedAndLoggedIn);
      }
    }, [authenticatedAndLoggedIn]);
    console.log(`are we logged in? ${authenticatedAndLoggedIn}`);

    const providerValue = getProviderValue() as GlobalStateProps;
    return (
      <GlobalState.Provider value={providerValue}>
        <WrappedComponent {...props} globalState={providerValue} />
      </GlobalState.Provider>
    );

    function getProviderValue() {
      const value = {
        history,
        location,
        loading,
        isLoggedIn,
        setSearchFilters,
        search: {
          filters: { ...searchFilters },
        },
      } as GlobalStateProps;
      console.log(`getProviderValue: ${JSON.stringify(value, null, 2)}`);
      return value;
    }
  };
};

const GlobalStateConsumerWrapper = (WrappedComponent: any) => {
  return function GlobalStateConsumer(props) {
    return (
      <GlobalState.Consumer>
        {(globalState) => {
          return <WrappedComponent {...props} globalState={globalState} />;
        }}
      </GlobalState.Consumer>
    );
  };
};

const withGlobalStateProvider = compose(GlobalStateProviderWrapper);
const withGlobalStateConsumer = GlobalStateConsumerWrapper;

export { withGlobalStateProvider, withGlobalStateConsumer };
