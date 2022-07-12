import { useAppSelector } from 'mediashare/store';
import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { findItemsSharedByMe, findItemsSharedWithMe } from 'mediashare/store/modules/shareItems';
import { loadProfile } from 'mediashare/store/modules/profile';
import { useProfile } from 'mediashare/hooks/useProfile';
import { useViewItemsSharedByMe, useViewItemsSharedWithMe } from 'mediashare/hooks/navigation';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB, Divider } from 'react-native-paper';
import { PageContainer, PageProps, AccountCard, ListItem } from 'mediashare/components/layout';
// import { theme } from 'mediashare/styles';

interface ContactProps extends PageProps {}

const Contact = ({ route, globalState }: ContactProps) => {
  const accountId = globalState?.user?._id;
  const { userId } = route.params;

  const dispatch = useDispatch();

  const viewSharedByContact = useViewItemsSharedWithMe();
  const viewSharedWithContact = useViewItemsSharedByMe();

  const profile = useProfile();

  const { username, firstName, lastName, email, phoneNumber, imageSrc } = profile || {};
  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';

  const itemsSharedWithContact = (useAppSelector((state) => state?.shareItems?.sharedByMe?.entities) || []).filter((item) => item.sharedWithUserId === userId);

  const itemsSharedByContact = (useAppSelector((state) => state?.shareItems?.sharedWithMe?.entities) || []).filter((item) => item.sharedByUserId === userId);

  useEffect(() => {
    dispatch(loadProfile(userId));
    dispatch(findItemsSharedByMe());
    dispatch(findItemsSharedWithMe());
  }, [userId]);

  // const [fabState, setFabState] = useState({ open: false });
  // const fabActions = [{ icon: 'rule', onPress: () => activateUnshareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } }];

  return (
    <PageContainer>
      <AccountCard
        title={fullName}
        username={username}
        email={email}
        phoneNumber={phoneNumber}
        image={imageSrc}
        showSocial={false}
        showActions={false}
        isCurrentUser={false}
      />
      <Divider />
      <ListItem
        key={'sharedByContact'}
        title="Items They're Sharing"
        description={`${itemsSharedByContact?.length || 0} shared items`}
        itemId={'sharedByContact'}
        showActions={true}
        onViewDetail={() => viewSharedByContact(userId)}
      />
      <ListItem
        key={'sharedWithContact'}
        title="Items You're Sharing"
        description={`${itemsSharedWithContact?.length || 0} shared items`}
        itemId={'sharedWithContact'}
        showActions={true}
        onViewDetail={() => viewSharedWithContact(userId)}
      />
      {/* !isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            setFabState(open);
          }}
        />
      ) */}
    </PageContainer>
  );
};

export default withLoadingSpinner(undefined)(Contact);

const styles = StyleSheet.create({});
