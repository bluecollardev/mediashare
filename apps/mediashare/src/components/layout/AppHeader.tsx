import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Appbar, Card, Portal, Searchbar } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { withGlobalStateConsumer, GlobalStateProps } from '../../core/globalState';
import { MultiSelectIcon } from '../form/MultiSelect';
import { ActionButtons } from './ActionButtons';
import themeStyles, { theme } from '../../styles';

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
    setDisplayMode: (value) => undefined,
    tags: [],
  },
}: AppHeaderProps) => {
  // console.log(`AppHeaderComponent > Dumping global state: ${JSON.stringify(globalState, null, 2)}`);
  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';
  const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
  const [searchIsActive, setSearchIsActive] = useState(false);
  // console.log(`[AppHeaderComponent] tags: ${JSON.stringify(tags, null, 2)}`);
  const [selectedTags, setSelectedTags] = useState([]);

  const placeholder = `Search ${title}`;

  const [searchText, setSearchText] = useState('');

  const availableMediaTags = useMemo(
    () =>
      [...globalState?.tags]
        .filter((tag) => tag?.isMediaTag)
        .map((tag) => ({
          id: tag?.key,
          name: tag?.value,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [displayMode, setDisplayMode] = useState(globalState?.displayMode);

  // console.log(`AppHeader > Dump current search filters: ${JSON.stringify(globalState?.search, null, 2)}`);

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
                            autoComplete={true}
                          />
                          {/* <Appbar.Action icon="close" onPress={() => disableSearch()} /> */}
                          <SectionedMultiSelect
                            colors={{
                              primary: theme.colors.primary,
                              text: '#fff',
                              subText: '#fff',
                              searchPlaceholderTextColor: '#fff',
                              selectToggleTextColor: '#fff',
                              searchSelectionColor: '#fff',
                              itemBackground: 'transparent',
                              subItemBackground: 'transparent',
                            }}
                            styles={{
                              container: {
                                backgroundColor: '#000',
                              },
                              searchTextInput: {
                                color: '#fff',
                              },
                              searchBar: {
                                backgroundColor: '#000',
                              },
                              selectToggle: {
                                marginVertical: 10,
                                paddingLeft: 15,
                                paddingRight: 10,
                                borderWidth: 1,
                                borderColor: theme.colors.defaultBorder,
                              },
                              chipContainer: {
                                marginTop: 10,
                              },
                            }}
                            items={availableMediaTags}
                            IconRenderer={MultiSelectIcon}
                            uniqueKey="id"
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
    // console.log('selected tags changed');
    // console.log(tags);
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
