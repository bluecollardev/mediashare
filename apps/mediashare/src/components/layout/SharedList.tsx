import React from 'react';

import { View, StyleSheet, SectionList } from 'react-native';
import { ProfileShareItem } from '../../rxjs-api';
import * as R from 'remeda';
import { Card, List } from 'react-native-paper';

import { ShareItemCard } from './ShareItemCard';

interface SharedListProps {
  sharedItems: ProfileShareItem[];
  onDelete?: any;
  onView?: any;
}

export function SharedList({ sharedItems, onDelete, onView }: SharedListProps) {
  const mappedSharedItems: Record<string, ProfileShareItem[]> = R.groupBy(sharedItems, (item) => item.author);
  const data = R.map(R.keys(mappedSharedItems), (key) => ({
    title: `${mappedSharedItems[key][0].authorName || 'Unnamed User'}`,
    count: mappedSharedItems[key].length,
    data: mappedSharedItems[key],
  }));
  return (
    <List.Section>
      <SectionList
        sections={data}
        renderSectionHeader={({ section }) => (
          <Card mode={'outlined'} style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
            <Card.Title titleStyle={{ fontSize: 16 }} title={`Shared by ${section.title}`}
                        subtitle={`${section.count.toString()} items`} />
          </Card>
        )}
        keyExtractor={(item) => item.shareItemId}
        renderItem={({ item }) => {
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
