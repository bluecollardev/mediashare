import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { withGlobalStateConsumer, GlobalStateProps } from 'mediashare/core/globalState';
import { useGoToAccount } from 'mediashare/hooks/navigation';
import { theme } from 'mediashare/styles';

export interface AppHeaderProps {
  options?: any;
  back?: any;
  navigation?: any;
  searchable?: boolean;
  searchTarget?: 'playlists' | 'media' | undefined;
  hideSearchIcon?: boolean;
  showAccountMenu?: boolean;
  showNotificationsMenu?: boolean;
  showDisplayControls?: boolean;
  globalState?: GlobalStateProps;
}

const AppHeaderComponent = ({
  options,
  back,
  navigation,
  showAccountMenu = false,
  showNotificationsMenu = false,
  showDisplayControls = false,
  hideSearchIcon = false,
  searchable = false,
  searchTarget = undefined,
  globalState = {
    openSearchConsole: () => undefined,
    closeSearchConsole: () => undefined,
    displayMode: 'list',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDisplayMode: (value) => undefined,
    tags: [],
  },
}: AppHeaderProps) => {
  const { openSearchConsole, closeSearchConsole, searchIsActive } = globalState;

  const goToAccount = useGoToAccount();

  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';

  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;

  const [displayMode, setDisplayMode] = useState(globalState?.displayMode);

  let searchIcon = hideSearchIcon ? (searchIsFiltering ? 'filter-list' : '') : !searchIsActive ? 'search' : searchIsActive ? 'filter-list' : 'filter-list';

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      {back && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 20,
          fontFamily: theme.fonts.medium.fontFamily,
        }}
      />
      {showDisplayControls && renderDisplayControls()}
      {searchable && <Appbar.Action icon={searchIcon} color={searchIsFiltering ? theme.colors.success : '#ffffff'} onPress={() => toggleSearchConsole()} />}
      {showNotificationsMenu && <Appbar.Action icon="notifications" onPress={() => undefined} />}
      {showAccountMenu && <Appbar.Action icon="person" onPress={() => goToAccount()} />}
    </Appbar.Header>
  );

  function viewAsList() {
    setDisplayMode('list');
    globalState?.setDisplayMode('list');
  }

  function viewAsArticles() {
    setDisplayMode('article');
    globalState?.setDisplayMode('article');
  }

  function toggleSearchConsole() {
    searchIsActive ? closeSearchConsole() : openSearchConsole();
  }

  function renderDisplayControls() {
    return (
      <>
        {displayMode === 'article' && <Appbar.Action icon="view-list" color="#ffffff" onPress={() => viewAsList()} />}
        {displayMode === 'list' && <Appbar.Action icon="article" color="#ffffff" onPress={() => viewAsArticles()} />}
      </>
    );
  }
};

export const AppHeader = withGlobalStateConsumer(AppHeaderComponent);
