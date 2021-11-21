import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../store';

import { ScrollView, View } from 'react-native';
import { Card, FAB, Subheading, Text } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { KeyboardAvoidingPageContent, PageActions, PageContainer, PageProps } from '../layout/PageContainer';
import AccountCard from '../layout/AccountCard';
import { MediaListItem } from '../layout/MediaListItem';
import { ActionButtons } from '../layout/ActionButtons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';

const SharedItems = ({ selectable = false }) => {
  const sharedItems = useAppSelector((state) => state.user.sharedItems) || [];
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 15,
          paddingBottom: 15,
          marginTop: 15,
          marginBottom: 15,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'lightgrey',
        }}
      >
        <MaterialIcons name="movie" color={theme.colors.primaryText} size={26} style={{ marginRight: 10 }} />
        <Text style={{ fontWeight: 'bold' }}>Items Shared With User</Text>
      </View>
      <ScrollView>
        {sharedItems.length > 0 ? (
          sharedItems.map((item) => {
            const { title, imageSrc } = item;
            return (
              <MediaListItem
                key={`shared_item_${title}`}
                title={`${title}`}
                // description={`${shortenText(description, 40)}`}
                showThumbnail={true}
                image={imageSrc}
                showActions={false}
                iconRightColor={theme.colors.accentDarker}
                selectable={selectable}
                onViewDetail={() => {}}
              />
            );
          })
        ) : (
          <Card style={{ width: '100%' }}>
            <Card.Content>
              <Subheading style={{ textAlign: 'center' }}>You have not shared any items with this user.</Subheading>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const actionModes = { delete: 'delete', default: 'default' };

export const User = ({}: PageProps) => {
  // const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  /* const [routes] = React.useState([
    { key: 'contacts', title: 'Contacts', icon: 'assignment-ind' },
    { key: 'shared', title: 'Shared Items', icon: 'movie' },
  ]); */

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    async function loadData() {
      // await dispatch(findMediaItems({}));
      // await dispatch(loadUsers());
      // await dispatch(loadUser());
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'delete-forever', onPress: () => activateDeleteMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.disabled } },
    { icon: 'person-remove', onPress: () => {}, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primaryDarker } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { firstName = 'Lucas', lastName = 'Lopatka', email, phoneNumber } = user;
  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <AccountCard title={`${firstName} ${lastName}`} email={email} phoneNumber={phoneNumber} image={user.imageSrc} showSocial={false} />
        {/* <Highlights highlights={state.highlights} /> */}
        <SharedItems key={clearSelectionKey} selectable={isSelectable} />
      </KeyboardAvoidingPageContent>
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons actionCb={confirmDelete} cancelCb={cancelDelete} actionLabel="Unshare" cancelLabel="Cancel" rightIcon="delete" />
        </PageActions>
      )}
      {!isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(User);
