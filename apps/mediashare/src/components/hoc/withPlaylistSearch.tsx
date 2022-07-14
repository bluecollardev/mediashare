import { ActionButtons } from 'mediashare/components/layout';
import React, { useEffect, useMemo, useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MultiSelectIcon } from 'mediashare/components/form';
import { GlobalStateProps } from 'mediashare/core/globalState';
import { Card, Divider, Searchbar } from 'react-native-paper';
import { components, theme } from 'mediashare/styles';

export interface PlaylistSearchProps {
  globalState?: GlobalStateProps;
  loaded: boolean;
}

export const withPlaylistSearch = (WrappedComponent: any) => {
  return function PlaylistSearch({
    globalState = { setSearchFilters: () => undefined },
    loaded,
    ...rest
  }: any) {
    const { setSearchFilters } = globalState;
    // const searchIsFiltering = globalState?.search?.filters?.text !== '' || globalState?.search?.filters?.tags?.length > 0;
    // const [searchIsActive, setSearchIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchTags, setSearchTags] = useState([]);

    // TODO: Make this configurable
    const searchTarget = 'playlists';

    const mappedTags = useMemo(() => {
      const availableTags = Array.isArray(globalState?.tags) ? globalState.tags : [];
      if (searchTarget === 'playlists') return availableTags.filter((tag) => tag.isPlaylistTag);
      if (searchTarget === 'media') return availableTags.filter((tag) => tag.isMediaTag);
      return availableTags;
    }, []);

    const searchFilters = globalState?.search?.filters || { text: '', tags: [] };
    const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '', tags: [] } });
    useEffect(() => {
      const currentSearchFilters = globalState?.search;
      if (!loaded || JSON.stringify(currentSearchFilters) !== JSON.stringify(prevSearchFilters)) {
        setPrevSearchFilters(currentSearchFilters);
      }
    }, [loaded, globalState, searchFilters]);

    return (
      <>
        <Card>
          <Card.Content>
            <Searchbar
              style={{ width: '100%', marginTop: 15 }}
              inputStyle={{ fontSize: 15 }}
              placeholder="Keywords"
              value={searchText}
              onChangeText={(text) => updateSearchText(text)}
              // onIconPress={() => closeSearchConsole()}
              icon=""
              // icon="arrow-back-ios"
              clearIcon="clear"
              autoCapitalize="none"
            />
            {/* <Appbar.Action icon="close" onPress={() => closeSearchConsole()} /> */}
            <SectionedMultiSelect
              colors={components.multiSelect.colors}
              styles={components.multiSelect.styles}
              items={mappedTags}
              IconRenderer={MultiSelectIcon}
              uniqueKey="key"
              displayKey="value"
              subKey="children"
              searchPlaceholderText="Enter Text"
              selectText="Select Tags"
              confirmText="Done"
              onSelectedItemsChange={updateSearchTags}
              selectedItems={searchTags}
              expandDropDowns={false}
              readOnlyHeadings={false}
              showDropDowns={true}
              parentChipsRemoveChildren={true}
              showCancelButton={true}
              modalWithTouchable={false}
              modalWithSafeAreaView={false}
            />
            <ActionButtons
              actionLabel="Search"
              actionButtonStyles={{ backgroundColor: theme.colors.primary }}
              showCancel={false}
              containerStyles={{ marginHorizontal: 0 }}
              onActionClicked={() => submitSearch()}
            />
            <Divider />
            <WrappedComponent globalState={globalState} {...rest} />
          </Card.Content>
        </Card>

      </>
    );

    /* function openSearchConsole() {
      setSearchIsActive(true);
    }

    function closeSearchConsole() {
      setSearchIsActive(false);
    } */

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
      // closeSearchConsole(); // Close the search
    }
  };
};
