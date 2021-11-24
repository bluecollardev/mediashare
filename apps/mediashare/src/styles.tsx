import { StyleSheet } from 'react-native';
import { DarkTheme } from 'react-native-paper';

const theme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    background: '#222222',
    success: '#9ECD3B',
    primary: '#00B8EC',
    default: '#BDC1C6',
    darkDefault: '#1D1D1D',
    defaultBorder: 'rgba(255,255,255,0.29)',
    accent: '#50C100',
    textDarker: '#BDC1C6',
    text: 'rgba(255,255,255,1)',
    error: 'rgba(242,22,81,1)',
  },
  fonts: {
    medium: { fontFamily: 'Roboto_500Medium', fontWeight: '500' },
    light: { fontFamily: 'Roboto_300Light', fontWeight: '300' },
    regular: { fontFamily: 'Roboto_400Regular', fontWeight: '400' },
    thin: { fontFamily: 'Roboto_100Thin', fontWeight: '100' },
  },
} as const;

const styles: any = StyleSheet.create({
  pageContainer: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  pageContent: {
    paddingTop: 5,
    paddingHorizontal: 5,
    height: '100%',
    flex: 1,
  },
  pageActions: {
    display: 'flex',
    width: '100%',
    height: 50, // Make sure actionButtons is the same height!
    backgroundColor: 'transparent',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    height: 50, // Make sure this is the same height as pageActions!
    borderTopWidth: 1,
    borderColor: 'transparent',
  },
  actionButton: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  deleteActionButton: {
    flex: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 30,
  },
  mediaListItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaListItemThumbnail: {
    marginLeft: 5,
    marginRight: 10,
  },
  tabContent: {
    backgroundColor: theme.colors.background,
    padding: 5,
  },
  tabContentQuarters: {
    height: '100%',
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: 0,
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.accent,
    borderBottomWidth: 0,
  },
  container: {
    height: '100%',
  },
  flexContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  card50: {
    flexBasis: '50%',
    padding: 3,
    backgroundColor: 'transparent',
  },
  textField: {
    marginBottom: 10,
    backgroundColor: theme.colors.surface,
  },
  changeImageButton: {
    borderTopWidth: 0,
    borderRadius: 0
  },
  deleteItemButton: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0
  },
  itemControls: {
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: theme.colors.defaultBorder,
    borderTopWidth: 1
  }
});

export default styles;

export { theme };
