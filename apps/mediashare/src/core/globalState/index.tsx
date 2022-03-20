import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'recompose';

import { useAppSelector } from '../../store';
import { getTags } from '../../store/modules/tags';
import { Tag } from '../../rxjs-api/models';

export interface GlobalStateProps {
  loading?: boolean;
  isLoggedIn?: boolean;
  history?: any;
  location?: any;
  search?: any;
  setSearchFilters?: Function;
  tags?: Tag[];
  displayMode?: 'list' | 'article';
  setDisplayMode: (value) => void;
}

export const GlobalState = React.createContext<GlobalStateProps>({} as GlobalStateProps);

export const INITIAL_SEARCH_FILTERS = {
  text: '',
  tags: [],
};

export const INITIAL_DISPLAY_MODE = 'list';

export const GlobalStateProviderWrapper = (WrappedComponent: any) => {
  return function GlobalStateProvider(props: any) {
    const { history, location } = props;

    const loading = useAppSelector((state) => state?.app.loading);
    const user = useAppSelector((state) => state?.user);
    const tags = useAppSelector((state) => state?.tags?.entities || []);
    const authenticatedAndLoggedIn = user?._id?.length > 0;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticatedAndLoggedIn);
    const [searchFilters, setSearchFilters] = useState(INITIAL_SEARCH_FILTERS);
    const [displayMode, setDisplayMode] = useState(INITIAL_DISPLAY_MODE);

    const dispatch = useDispatch();

    useEffect(() => {
      if (authenticatedAndLoggedIn) {
        console.log('authenticatedAndLoggedIn is true, run setIsLoggedIn effect');
        setIsLoggedIn(authenticatedAndLoggedIn);
      }
    }, [authenticatedAndLoggedIn]);
    console.log(`are we logged in? ${authenticatedAndLoggedIn}`);

    useEffect(() => {
      const loadTags = async () => {
        await dispatch(getTags());
      };

      if (isLoggedIn) {
        loadTags().finally();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

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
        tags,
        displayMode,
        setDisplayMode,
      } as GlobalStateProps;
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
