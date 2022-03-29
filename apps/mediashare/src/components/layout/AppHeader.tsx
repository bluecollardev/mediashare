import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Appbar, Card, Portal, Searchbar } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { withGlobalStateConsumer, GlobalStateProps } from 'mediashare/core/globalState';
import { MultiSelectIcon } from 'mediashare/components/form/MultiSelect';
import { ActionButtons } from './ActionButtons';
import themeStyles, { theme } from 'mediashare/styles';

import { mapAvailableTags } from 'mediashare/store/modules/tags/utils';

export interface AppHeaderProps {
  options?: any;
  back?: any;
  navigation?: any;
  searchable?: boolean;
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
  searchable = false,
  showDisplayControls = false,
  globalState = {
    displayMode: 'list',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDisplayMode: (value) => undefined,
    tags: [],
  },
}: AppHeaderProps) => {
  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';
  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const placeholder = `Search ${title}`;

  const [searchText, setSearchText] = useState('');

  const mappedMediaTags = useMemo(() => mapAvailableTags(Array.isArray(globalState?.tags) ? globalState.tags : []).filter((tag) => tag.isPlaylistTag), []);

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
                  disableSearch();
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
                        // styles.container
                      ]}
                    >
                      <Card>
                        <Card.Title title={placeholder} />
                        <Card.Content style={{ height: '85%', paddingBottom: 50 }}>
                          <Searchbar
                            style={{ width: '100%' }}
                            placeholder="Keywords"
                            value={searchText}
                            onChangeText={(text) => updateSearchText(text)}
                            onIconPress={() => disableSearch()}
                            icon=""
                            // icon="arrow-back-ios"
                            clearIcon="clear"
                            autoCapitalize="none"
                          />
                          {/* <Appbar.Action icon="close" onPress={() => disableSearch()} /> */}
                          <SectionedMultiSelect
                            colors={{
                              primary: theme.colors.primary,
                              text: '#fff',
                              subText: '#fff',
                              searchPlaceholderTextColor: theme.colors.placeholder,
                              selectToggleTextColor: theme.colors.placeholder,
                              searchSelectionColor: '#fff',
                              itemBackground: 'transparent',
                              subItemBackground: 'transparent',
                            }}
                            styles={{
                              searchTextInput: {
                                color: '#fff',
                              },
                              searchBar: {
                                backgroundColor: '#000',
                              },
                              container: {
                                backgroundColor: '#000',
                              },
                              selectToggle: {
                                marginVertical: 10,
                                paddingLeft: 15,
                                paddingRight: 10,
                                borderWidth: 1,
                                borderColor: theme.colors.defaultBorder,
                                backgroundColor: theme.colors.surface,
                              },
                              chipContainer: {
                                marginTop: 10,
                              },
                            }}
                            items={mappedMediaTags}
                            IconRenderer={MultiSelectIcon}
                            uniqueKey="key"
                            displayKey="value"
                            subKey="children"
                            searchPlaceholderText="Enter Text"
                            selectText="Select Tags"
                            confirmText="Done"
                            onSelectedItemsChange={onSelectedTagsChange}
                            selectedItems={selectedTags}
                            expandDropDowns={false}
                            readOnlyHeadings={false}
                            showDropDowns={true}
                            parentChipsRemoveChildren={true}
                            showCancelButton={true}
                            modalWithTouchable={false}
                            modalWithSafeAreaView={false}
                          />
                        </Card.Content>
                      </Card>
                      <ActionButtons
                        containerStyles={{ marginHorizontal: 0 }}
                        onActionClicked={() => disableSearch()}
                        onCancelClicked={() => disableSearch()}
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
      {showDisplayControls && renderDisplayControls()}
      <Appbar.Content
        title={title}
        titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginRight: searchable && searchIsFiltering ? '-30%' : '0%' }}
      />
      {searchable && searchIsFiltering && <Appbar.Action icon="filter-list" color={theme.colors.primary} onPress={() => enableSearch()} />}
      {searchable && !searchIsActive && <Appbar.Action icon="search" color="#ffffff" onPress={() => enableSearch()} />}
    </Appbar.Header>
  );

  function onSelectedTagsChange(tags) {
    setSelectedTags(tags);
    updateSearchTags(tags);
  }

  function enableSearch() {
    setSearchIsActive(true);
  }
  function disableSearch() {
    setSearchIsActive(false);
  }

  function viewAsList() {
    setDisplayMode('list');
    globalState?.setDisplayMode('list');
  }
  function viewAsArticles() {
    setDisplayMode('article');
    globalState?.setDisplayMode('article');
  }

  // TODO: Throttle the search we don't want this poppin' off more than it needs to
  function updateSearchText(searchText) {
    const { setSearchFilters } = globalState;
    // Set the in-component state value
    setSearchText(searchText);
    // Set the global value
    setSearchFilters({ text: searchText, tags: [...selectedTags] });
  }

  function updateSearchTags(searchTags = []) {
    const { setSearchFilters } = globalState;
    // Set the in-component state value
    // Set the global value
    setSearchFilters({ text: searchText, tags: [...searchTags] });
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
