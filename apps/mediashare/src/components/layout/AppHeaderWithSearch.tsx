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
  const placeholder = `Filter ${title}`;

  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const mappedTags = useMemo(() => {
    const availableTags = Array.isArray(globalState?.tags) ? globalState.tags : [];
    if (searchTarget === 'playlists') return availableTags.filter((tag) => tag.isPlaylistTag);
    if (searchTarget === 'media') return availableTags.filter((tag) => tag.isMediaTag);
    return availableTags;
  }, []);

  const [displayMode, setDisplayMode] = useState(globalState?.displayMode);

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      {searchable && searchIsActive && (
        <Portal>
          <SafeAreaView style={themeStyles.pageContainer}>
            <View>
              <Modal
                transparent
                visible={searchIsActive}
                onRequestClose={() => {
                  closeSearchConsole();
                }}
              >
                <ModalContentWrapper>
                  <BackdropView>
                    <View
                      style={[
                        {
                          overflow: 'hidden',
                          marginHorizontal: 18,
                          marginVertical: 26,
                          borderRadius: 6,
                          alignSelf: 'stretch',
                          backgroundColor: 'transparent',
                        },
                      ]}
                    >
                      <Card>
                        <Card.Title title={placeholder} />
                        <Card.Content style={{ height: '89%', paddingBottom: 0 }}>
                          <Searchbar
                            style={{ width: '100%', marginTop: 15 }}
                            inputStyle={{ fontSize: 15 }}
                            placeholder="Keywords"
                            value={searchText}
                            onChangeText={(text) => updateSearchText(text)}
                            onIconPress={() => closeSearchConsole()}
                            icon=""
                            // icon="arrow-back-ios"
                            clearIcon="clear"
                            autoCapitalize="none"
                          />
                          {/* <Appbar.Action icon="close" onPress={() => closeSearchConsole()} /> */}
                          <SectionedMultiSelect
                            headerComponent={() => {
                              return (
                                <Card>
                                  <Card.Title title="Choose Tags" />
                                </Card>
                              );
                            }}
                            colors={components.multiSelect.colors}
                            styles={components.multiSelect.styles}
                            items={mappedTags}
                            IconRenderer={MultiSelectIcon}
                            uniqueKey="key"
                            displayKey="value"
                            subKey="children"
                            searchPlaceholderText="Enter Text"
                            selectText="Select Tags"
                            confirmText="Save"
                            onSelectedItemsChange={updateSearchTags}
                            selectedItems={searchTags}
                            hideSearch={true}
                            showRemoveAll={false}
                            expandDropDowns={false}
                            readOnlyHeadings={false}
                            showDropDowns={true}
                            parentChipsRemoveChildren={true}
                            showCancelButton={true}
                            modalWithTouchable={false}
                            modalWithSafeAreaView={false}
                            modalAnimationType="slide"
                          />
                        </Card.Content>
                      </Card>
                      <ActionButtons
                        containerStyles={{ marginHorizontal: 0 }}
                        onPrimaryClicked={() => submitSearch()}
                        onSecondaryClicked={() => closeSearchConsole()}
                      />
                    </View>
                  </BackdropView>
                </ModalContentWrapper>
              </Modal>
            </View>
          </SafeAreaView>
        </Portal>
      )}

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
      {searchable && !showSearchSettings && (
        <Appbar.Action icon="filter-list" color={searchIsFiltering ? theme.colors.success : '#ffffff'} onPress={() => openSearchConsole()} />
      )}
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
  }

  function updateSearchText(value) {
    // Set the in-component state value
    setSearchText(value);
  }

  function updateSearchTags(values) {
    // Set the in-component state value
    setSearchTags(values);
  }

  function submitSearch() {
    // Update global search filters
    setSearchFilters({ text: searchText, tags: [...searchTags] });
    closeSearchConsole(); // Close the search
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
