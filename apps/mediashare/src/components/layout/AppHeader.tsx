import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Appbar, Card, Portal, Searchbar } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { withGlobalStateConsumer, GlobalStateProps } from 'mediashare/core/globalState';
import { useGoToAccount } from 'mediashare/hooks/navigation';
import { MultiSelectIcon } from 'mediashare/components/form/MultiSelect';
import { ActionButtons } from './ActionButtons';
import themeStyles, { theme, components } from 'mediashare/styles';

export interface AppHeaderProps {
  options?: any;
  back?: any;
  navigation?: any;
  searchable?: boolean;
  searchTarget?: 'playlists' | 'media' | undefined;
  showSearchSettings?: boolean;
  showAccountMenu?: boolean;
  showNotificationsMenu?: boolean;
  showDisplayControls?: boolean;
  globalState?: GlobalStateProps;
}

const ModalContentWrapper = (props) => {
  const { modalWithSafeAreaView, children } = props;
  const Component = modalWithSafeAreaView ? SafeAreaView : View;
  return (
    <Component
      style={[
        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
        // styles.modalWrapper
      ]}
    >
      {children}
    </Component>
  );
};

const BackdropView = (props) => {
  const { modalWithTouchable, children } = props;
  const Wrapper = modalWithTouchable ? TouchableWithoutFeedback : null;

  return Wrapper ? (
    <Wrapper onPress={() => undefined}>
      <View {...props}>{children}</View>
    </Wrapper>
  ) : (
    <View {...props} />
  );
};

const AppHeaderComponent = ({
  options,
  back,
  navigation,
  showAccountMenu = true,
  showNotificationsMenu = false,
  showDisplayControls = false,
  showSearchSettings = false,
  searchable = false,
  searchTarget = undefined,
  globalState = {
    displayMode: 'list',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDisplayMode: (value) => undefined,
    tags: [],
  },
}: AppHeaderProps) => {
  const { setSearchFilters } = globalState;

  const goToAccount = useGoToAccount();

  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';

  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const [displayMode, setDisplayMode] = useState(globalState?.displayMode);

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
      {searchable && showSearchSettings && <Appbar.Action icon="settings" onPress={() => undefined} />}
      {searchable && !showSearchSettings && <Appbar.Action icon="filter-list" color={searchIsFiltering ? theme.colors.success : '#ffffff'} onPress={() => closeSearchConsole()} />}
      {showNotificationsMenu && <Appbar.Action icon="notifications" onPress={() => openSearchConsole()} />}
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

  function openSearchConsole() {
    setSearchIsActive(true);
  }

  function closeSearchConsole() {
    setSearchIsActive(false);
    setSearchFilters({ text: '', tags: [] });
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
