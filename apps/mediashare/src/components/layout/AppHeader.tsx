import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Appbar, Card, Portal, Searchbar, Text, IconButton } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MultiSelectIcon } from '../form/MultiSelect';
import { withGlobalStateConsumer, GlobalStateProps } from '../../core/globalState';
import themeStyles, { theme } from '../../styles';

import { customMediaTags, customMediaSubtags, customPlaylistTags, customPlaylistSubtags } from '../../data/tags';

export interface AppHeaderProps {
  options?: any;
  back?: any;
  navigation?: any;
  searchable?: boolean;
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

const AppHeaderComponent = ({ options, back, navigation, searchable = false, globalState }: AppHeaderProps) => {
  // console.log(`AppHeaderComponent > Dumping global state: ${JSON.stringify(globalState, null, 2)}`);
  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';
  const [searchIsActive, setSearchIsActive] = useState(false);

  const enableSearch = () => setSearchIsActive(true);
  const disableSearch = () => setSearchIsActive(false);

  const placeholder = `Search ${title}`;

  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => {
    const { setSearchFilters } = globalState;
    // TODO: We have to throttle this!
    setSearchText(text);
    setSearchFilters({ text });
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const onSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const onSelectedTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  const availableMediaTags = useMemo(
    () =>
      [...customMediaTags, ...customMediaSubtags]
        .filter((tag) => tag.isMediaTag)
        .map((tag) => ({
          id: tag?.key,
          name: tag?.value,
        })),
    []
  );

  const availablePlaylistTags = useMemo(
    () =>
      [...customPlaylistTags, ...customPlaylistSubtags]
        .filter((tag) => tag.isPlaylistTag)
        .map((tag) => ({
          id: tag?.key,
          name: tag?.value,
        })),
    []
  );

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
                              searchTextInput: {
                                color: '#fff',
                              },
                              searchBar: {
                                backgroundColor: '#000',
                              },
                              container: {
                                backgroundColor: '#000',
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
                            readOnlyHeadings={true}
                            showDropDowns={true}
                            parentChipsRemoveChildren={true}
                            showCancelButton={true}
                            modalWithTouchable={true}
                            modalWithSafeAreaView={true}
                          />
                        </Card.Content>
                      </Card>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback
                          accessibilityRole="button"
                          onPress={() => {
                            disableSearch();
                          }}
                        >
                          <View
                            style={[
                              {
                                width: 54,
                                // flex: Platform.OS === 'android' ? 0 : 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderRadius: 0,
                                flexDirection: 'row',
                                // backgroundColor: colors.cancel
                              },
                              // styles.cancelButton
                            ]}
                          >
                            <IconButton icon="cancel" />
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                          accessibilityRole="button"
                          onPress={() => {
                            disableSearch();
                          }}
                          style={{ flex: 1 }}
                        >
                          <View
                            style={[
                              {
                                // flex: Platform.OS === 'android' ? 1 : 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderRadius: 0,
                                flexDirection: 'row',
                                backgroundColor: theme.colors.primary,
                                width: '100%',
                                height: 50,
                              },
                              // styles.button
                            ]}
                          >
                            <Text
                              style={[
                                {
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  fontSize: 18,
                                  color: '#ffffff',
                                  fontWeight: 'bold',
                                  paddingRight: 35,
                                },
                                // confirmFont,
                                // styles.confirmText
                              ]}
                            >
                              Update Search
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </BackdropView>
                </ModalContentWrapper>
              </Modal>
            </View>
          </SafeAreaView>
        </Portal>
      )}
      {searchable && !searchIsActive && (
        <>
          {back && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingLeft: '15%' }} />
          <Appbar.Action icon="search" color="#ffffff" onPress={() => enableSearch()} />
        </>
      )}
      {!searchable && (
        <>
          {back && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingRight: back ? '15%' : 0 }} />
        </>
      )}
    </Appbar.Header>
  );
};

export const AppHeader = withGlobalStateConsumer(AppHeaderComponent);
