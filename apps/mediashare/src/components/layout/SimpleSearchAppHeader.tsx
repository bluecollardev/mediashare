import React, { useState } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { withGlobalStateConsumer, GlobalStateProps } from 'mediashare/core/globalState';
import { theme } from 'mediashare/styles';

interface AppHeaderProps {
  options?: any;
  back?: any;
  navigation?: any;
  searchable?: boolean;
  globalState?: GlobalStateProps;
}

const AppHeaderComponent = ({ options, back, navigation, searchable = false, globalState }: AppHeaderProps) => {
  const [searchIsActive, setSearchIsActive] = useState(false);
  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';

  const enableSearch = () => setSearchIsActive(true);
  const disableSearch = () => setSearchIsActive(false);

  const placeholder = `Filter ${title}`;

  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => {
    const { setSearchFilters } = globalState;
    // TODO: We have to throttle this!
    setSearchText(text);
    setSearchFilters({ text });
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      {searchable && searchIsActive && (
        <>
          <Searchbar
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={searchText}
            onChangeText={(text) => updateSearchText(text)}
            onIconPress={() => disableSearch()}
            icon="arrow-back-ios"
            clearIcon="clear"
            autoCapitalize="none"
          />
          <Appbar.Action icon="close" onPress={() => disableSearch()} />
        </>
      )}
      {searchable && !searchIsActive && (
        <>
          {back && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, paddingLeft: '15%' }} />
          <Appbar.Action icon="search" color="#ffffff" onPress={() => enableSearch()} />
        </>
      )}
      {!searchable && (
        <>
          {back && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, paddingRight: back ? '15%' : 0 }} />
        </>
      )}
    </Appbar.Header>
  );
};

export const SimpleAppHeader = withGlobalStateConsumer(AppHeaderComponent);
