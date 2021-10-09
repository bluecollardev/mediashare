import React, { ReactNode } from 'react';

import { View, Text, StyleSheet, SectionList } from 'react-native';
import { ProfileDto, ProfileShareItem } from '../../rxjs-api';
import * as R from 'remeda';
import { Card, List } from 'react-native-paper';
import ShareItemCard from '../../components/layout/ShareItemCard';

interface SharedListProps {
  sharedItems: ProfileShareItem[];
  onDelete: any;
  onView: any;
}

function SharedList({ sharedItems, onDelete, onView }: SharedListProps) {
  const mappedSharedItems: Record<string, ProfileShareItem[]> = R.groupBy(sharedItems, (item) => item.author);
  const data = R.map(R.keys(mappedSharedItems), (key) => ({
    title: `${mappedSharedItems[key][0].authorName}`,
    count: mappedSharedItems[key].length,
    data: mappedSharedItems[key],
  }));
  return (
    <List.Section>
      <SectionList
        sections={data}
        renderSectionHeader={({ section }) => (
          <Card mode={'outlined'} style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
            <Card.Title title={section.title} subtitle={`${section.count.toString()} items`} />
          </Card>
        )}
        keyExtractor={(item) => item.shareItemId}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default SharedList;
