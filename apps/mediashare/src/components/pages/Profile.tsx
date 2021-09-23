import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { from } from 'rxjs';
import { useAppSelector } from '../../state';
import { getUserById } from '../../state/modules/profile';
import { LoadingSpinnerProps, withLoadingSpinner } from '../hoc/withLoadingSpinner';
import AccountCard from '../layout/AccountCard';
import { Subheading, Title, Paragraph, Caption, Colors, IconButton, Chip, List, Banner, Appbar, Card, Headline, Button, FAB } from 'react-native-paper';
import { theme } from '../../styles';
import * as R from 'remeda';
import ShareItemCard from '../layout/ShareItemCard';
import { ProfileShareItem } from '../../api/models/profile-share-item';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LabelledElement from '../layout/LabelledElement';
import { sectionHeaderContent } from 'aws-amplify';
import { usePlaylists, useRouteWithParams, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { removeShareItem, readShareItem } from '../../state/modules/share-items/index';
import { ROUTES } from '../../routes';
interface ProfileProps extends LoadingSpinnerProps {}

function Profile({ onDataLoaded }: ProfileProps) {
  const [loaded, setLoaded] = useState(false);
  const userId = '6149b54a19531dd4c6b0df59';
  const dispatch = useDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const profile = useAppSelector((state) => state.profile.entity);
  const accountEdit = useRouteWithParams(ROUTES.accountEdit);
  const { firstName, lastName, email, phoneNumber, imageSrc, sharedItems = [] } = profile || {};
  const mappedSharedItems: Record<string, ProfileShareItem[]> = R.groupBy(sharedItems, (item) => item.author);
  const data = R.map(R.keys(mappedSharedItems), (key) => ({
    title: `${mappedSharedItems[key][0].authorName}`,
    count: mappedSharedItems[key].length,
    data: mappedSharedItems[key],
  }));

  const playlist = useViewPlaylistById();

  const onDelete = function (itemId: string) {
    console.log(itemId);
    from(dispatch(removeShareItem(itemId))).subscribe(() => {
      setLoaded(false);
      console.log(profile);
    });
  };

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    setLoaded(false);
    playlist({ playlistId });
  };
  useEffect(() => {
    const loadData = async function () {
      await dispatch(getUserById({ userId }));
      setLoaded(true);
    };
    from(loadData()).subscribe(onDataLoaded);
  }, [loaded, dispatch, onDataLoaded]);

  return (
    <View style={styles.container}>
      <AccountCard fullName={`${firstName} ${lastName}`} email={email} phoneNumber={phoneNumber} image={imageSrc} likes={0} shares={0} shared={0} />
      <Button mode={'outlined'} style={{ margin: 15 }} onPress={() => accountEdit({ userId: profile._id })}>
        Edit Profile
      </Button>
      <List.Section>
        <SectionList
          sections={data}
          renderSectionHeader={({ section }) => (
            <Card mode={'outlined'} style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
              <Card.Title title={section.title} subtitle={`${section.count.toString()} items`} />
            </Card>
          )}
          keyExtractor={(item, index) => item.shareItemId}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View style={{}}>
                <ShareItemCard
                  title={item.title}
                  date={item.createdAt}
                  read={item.read}
                  image={item.imageSrc}
                  onDelete={() => onDelete(item.shareItemId)}
                  onView={() => onView(item.playlistId, item.shareItemId)}
                />
              </View>
            );
          }}
        />
      </List.Section>

      {/* <View style={styles.listContainer}>
        {R.keys(mappedSharedItems).map((key) => {
          const items = mappedSharedItems[key];
          return (
            <>
              {items.map((item) => {
                return <ShareItemCard title={item.title} />;
              })}
            </>
          );
        })}
      </View> */}
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
