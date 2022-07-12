import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'recompose';
import { useAppSelector } from 'mediashare/store';
import { useUser } from 'mediashare/hooks/useUser';
import { loadUser } from 'mediashare/store/modules/user';
import { getTags } from 'mediashare/store/modules/tags';
import { findItemsSharedByMe, findItemsSharedWithMe } from 'mediashare/store/modules/shareItems';
import { BcRolesType, ProfileDto, Tag } from 'mediashare/rxjs-api';

export interface GlobalStateProps {
  history?: any;
  location?: any;
  loading?: boolean;
  isLoggedIn?: boolean;
  user?: Partial<ProfileDto>;
  roles?: BcRolesType[];
  build?: {
    forFreeUser: boolean;
    forSubscriber: boolean;
    forAdmin: boolean;
  };
  loadUserData?: () => void;
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
export const DEFAULT_USER_ROLE = 'free';

export const GlobalStateProviderWrapper = (WrappedComponent: any) => {
  return function GlobalStateProvider(props: any) {
    const { history, location } = props;

    const loading = useAppSelector((state) => state?.app?.loading);
    const tags = useAppSelector((state) => state?.tags?.entities || []);

    const [searchFilters, setSearchFilters] = useState(INITIAL_SEARCH_FILTERS);
    const [displayMode, setDisplayMode] = useState(INITIAL_DISPLAY_MODE);

    const user = useUser();
    const { roles, isLoggedIn, build } = user;

    const dispatch = useDispatch();

    useEffect(() => {
      const loadTags = async () => {
        await dispatch(getTags());
      };

      if (isLoggedIn) {
        loadTags().then();
      }
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
        user,
        roles,
        build,
        loadUserData,
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

    async function loadUserData() {
      await dispatch(loadUser());
      await dispatch(findItemsSharedByMe());
      await dispatch(findItemsSharedWithMe());
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
