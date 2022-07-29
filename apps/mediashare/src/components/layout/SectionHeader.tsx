import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from 'mediashare/styles';


export interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
}

export const SectionHeader = ({ title = '',  subtitle = '' }: SectionHeaderProps) => {
  // TODO: Don't use a card for this....
  return (
    <>
      <Text style={defaultStyles.sectionHeaderTitle}>{title || null}</Text>
      <Text style={defaultStyles.sectionHeaderTitle}>{subtitle || null}</Text>
    </>

  );
}

const defaultStyles = StyleSheet.create({
  sectionHeader: {
    borderColor: 'transparent',
  },
  sectionHeaderTitle: {
    fontSize: 13,
    ...theme.fonts.bold
  },
});
