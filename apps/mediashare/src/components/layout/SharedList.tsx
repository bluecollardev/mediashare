import React from 'react';
import * as R from 'remeda';

import { ProfileShareItem } from '../../rxjs-api';

import { View, StyleSheet, SectionList } from 'react-native';
import { Card } from 'react-native-paper';
import { ShareItemCard } from './ShareItemCard';

interface SharedListProps {
  sharedItems: ProfileShareItem[];
  selectable?: boolean;
  showActions?: boolean;
  onDelete?: any;
  onView?: any;
}

export const SharedList = ({ sharedItems, selectable, showActions, onDelete, onView }: SharedListProps) => {
  const mappedSharedItems: Record<string, ProfileShareItem[]> = R.groupBy(sharedItems, (item) => item.author);
  const data = R.map(R.keys(mappedSharedItems), (key) => ({
    title: `${mappedSharedItems[key][0].authorName || 'Unnamed User'}`,
    count: mappedSharedItems[key].length,
    data: mappedSharedItems[key],
  }));

  return (
    <SectionList
      style={{ height: '100%' }}
      sections={data}
      renderSectionHeader={({ section }) => (
        <Card mode="outlined" style={styles.sectionHeader}>
          <Card.Title titleStyle={styles.sectionHeaderTitle} title={`Shared by ${section.title}`} subtitle={`${section.count.toString()} items`} />
        </Card>
      )}
      keyExtractor={(item) => item.shareItemId}
      renderItem={({ item }) => {
        return (
          <View>
            <ShareItemCard
              title={item.title}
              date={item.createdAt}
              read={item.read}
              image={item.imageSrc}
              selectable={selectable}
              showActions={showActions}
              onDelete={() => onDelete(item.shareItemId)}
              onView={() => onView(item.playlistId, item.shareItemId)}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    borderColor: 'transparent',
    backgroundColor: '#ffffff',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    color: '#444444',
  },
});
