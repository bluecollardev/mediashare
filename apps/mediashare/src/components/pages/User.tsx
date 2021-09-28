import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { loadUser } from '../../state/modules/user';
import { findMediaItems } from '../../state/modules/media-items';
import { loadUsers } from '../../state/modules/users';

import { ScrollView } from 'react-native';
import { FAB, Title } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps } from '../layout/PageContainer';
import AccountCard from '../layout/AccountCard';

import { theme } from '../../styles';
import { MediaListItem } from '../layout/MediaListItem';

const SharedItems = () => {
  const mediaItems = useAppSelector((state) => state.user.mediaItems) || [];
  return (
    <ScrollView>
      {mediaItems.length > 0 ? (
        mediaItems.map((item) => {
          const { _id, title, description, thumbnail } = item;
          return (
            <MediaListItem
              key={`item_${_id}`}
              title={`${title}`}
              description={`${description}>`}
              showThumbnail={true}
              image={thumbnail}
              showActions={false}
              iconRightColor={theme.colors.accentDarker}
              selectable={true}
              onViewDetail={() => {}}
            />
          );
        })
      ) : (
        <Title>No Items</Title>
      )}
    </ScrollView>
  );
};

export const User = ({}: PageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  /* const [routes] = React.useState([
    { key: 'contacts', title: 'Contacts', icon: 'assignment-ind' },
    { key: 'shared', title: 'Shared Items', icon: 'movie' },
  ]); */

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    async function loadData() {
      await dispatch(findMediaItems());
      await dispatch(loadUsers());
      await dispatch(loadUser());
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const dispatch = useDispatch();

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [{ icon: 'delete', onPress: () => {}, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primaryDarker } }];

  const { firstName = 'Lucas', lastName = 'Lopatka', email, phoneNumber } = user;
  return (
    <PageContainer>
      <AccountCard title={`${firstName} ${lastName}`} email={email} phoneNumber={phoneNumber} image={user.imageSrc} likes={49} shared={30} shares={300} />
      {/* <Highlights highlights={state.highlights} /> */}
      <SharedItems />
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
    </PageContainer>
  );
};

export default withLoadingSpinner(User);
