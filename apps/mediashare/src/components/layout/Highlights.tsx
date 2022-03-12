import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LabelledAvatar from './LabelledAvatar';

interface HighlightsProps {
  highlights: { title: string; thumbnail: string }[];
}

function Highlights({ highlights }: HighlightsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.highlight}>
        {highlights.map((highlight) => {
          return <LabelledAvatar label={highlight.title} uri={highlight.thumbnail} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'column', height: 75 },
  highlight: { display: 'flex', flexDirection: 'row', flex: 1, marginLeft: 15 },
});

export default Highlights;
