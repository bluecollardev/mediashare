import React from 'react';
import * as R from 'remeda';

import { ProfileShareItem } from 'mediashare/rxjs-api';

import { View, StyleSheet, SectionList } from 'react-native';
import { Card } from 'react-native-paper';
import { ShareItemCard } from './ShareItemCard';
import { useUser } from 'mediashare/hooks/useUser';

interface SharedListProps {
  sharedItems: ProfileShareItem[];
  showActions?: boolean;
  onDelete?: any;
  onView?: any;
  selectable?: boolean;
  onChecked?: (bool: boolean, userId: string) => void;
  renderSectionHeader?: boolean;
}

export const SharedList = ({
  sharedItems,
  selectable,
  showActions,
  onDelete = () => undefined,
  onView = () => undefined,
  onChecked = () => undefined,
  renderSectionHeader = false,
}: SharedListProps) => {
  const { _id } = useUser();

  // TODO: Make some use of this or remove it!
  const mappedSharedItems: Record<string, ProfileShareItem[]> = R.groupBy(sharedItems, (item) => item.author);
  const data = R.map(R.keys(mappedSharedItems), (key) => {
    const heading =
      mappedSharedItems[key][0].authorId === _id
        ? 'Shared with Subscriber'
        : mappedSharedItems[key][0].authorId !== _id
        ? `Shared by ${mappedSharedItems[key][0].authorName}`
        : 'Shared by Unknown User';
    return {
      title: `${heading}`,
      count: mappedSharedItems[key].length,
      data: mappedSharedItems[key],
    };
  });

  return (
    <SectionList
      style={{ height: '100%' }}
      sections={data}
      renderSectionHeader={
        renderSectionHeader
          ? ({ section }) => (
              <Card mode="outlined" style={styles.sectionHeader}>
                <Card.Title titleStyle={styles.sectionHeaderTitle} title={section.title} subtitle={`${section.count.toString()} items`} />
              </Card>
            )
          : null
      }
      keyExtractor={(item) => item.shareId}
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
              onDelete={() => onDelete(item.shareId)}
              onView={() => onView(item.playlistId, item.shareId)}
              onChecked={(checked) => onChecked(checked, item.shareId)}
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
  },
  sectionHeaderTitle: {
    fontSize: 15,
  },
});
