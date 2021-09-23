import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { from } from 'rxjs';
import { useAppSelector } from '../../state';
import { LoadingSpinnerProps, withLoadingSpinner } from '../hoc/withLoadingSpinner';
import AccountCard from '../layout/AccountCard';
import { Button } from 'react-native-paper';
import { theme } from '../../styles';

import { useRouteWithParams, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { removeShareItem, readShareItem } from '../../state/modules/share-items/index';
import { ROUTES } from '../../routes';
import { loadProfile } from '../../state/modules/profile';
import { take } from 'rxjs/operators';
import SharedList from '../../api/models/SharedList';
interface ProfileProps extends LoadingSpinnerProps {}

function Profile({ onDataLoaded }: ProfileProps) {
  const [loaded, setLoaded] = useState(false);
  const userId = '6149b54a19531dd4c6b0df59';
  const dispatch = useDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const isAdmin = userRole === 'admin';
  console.log('🚀 ---------------------------------------------------------------');
  console.log('🚀 ~ file: Profile.tsx ~ line 24 ~ Profile ~ userRole', isAdmin);
  console.log('🚀 ---------------------------------------------------------------');
  const profile = useAppSelector((state) => state.profile.entity);
  const accountEdit = useRouteWithParams(ROUTES.accountEdit);
  const { firstName, lastName, email, phoneNumber, imageSrc, sharedItems = [] } = profile || {};

  const playlist = useViewPlaylistById();

  const onDelete = function (itemId: string) {
    from(dispatch(removeShareItem(itemId))).subscribe(() => {
      setLoaded(false);
    });
  };

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    setLoaded(false);
    playlist({ playlistId });
  };
  useEffect(() => {
    from(dispatch(loadProfile({ userId })))
      .pipe(take(1))
      .subscribe(() => {
        onDataLoaded();
        setLoaded(true);
      });
  }, [loaded, dispatch, onDataLoaded]);

  return (
    <View style={styles.container}>
      <AccountCard
        fullName={`${firstName} ${lastName}`}
        email={email}
        phoneNumber={phoneNumber}
        image={imageSrc}
        likes={profile.likesCount}
        shares={profile.sharesCount}
        shared={profile.sharedCount}
      />
      {isAdmin && (
        <Button mode={'outlined'} style={{ margin: 15 }} onPress={() => accountEdit({ userId: profile._id })}>
          Edit Profile
        </Button>
      )}

      <SharedList onDelete={onDelete} onView={onView} sharedItems={sharedItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  text: {
    color: theme.colors.primaryTextLighter,
  },
  listContainer: {
    padding: 15,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  sharedItemCard: {
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.success,
    color: theme.colors.primaryTextLighter,
    // padding: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default withLoadingSpinner(Profile);
