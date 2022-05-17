import { StyleSheet } from 'react-native';
import { DarkTheme } from 'react-native-paper';

const theme = {
  ...DarkTheme,
  roundness: 0,
  colors: {
    ...DarkTheme.colors,
    background: 'rgba(30,30,30,1)',
    success: '#9ECD3B',
    primary: '#00B8EC',
    default: '#BDC1C6',
    darkDefault: '#1D1D1D',
    defaultBorder: 'rgba(255,255,255,0.29)',
    accent: '#50C100',
    textDarker: '#BDC1C6',
    text: 'rgba(255,255,255,1)',
    error: 'rgba(242,22,81,1)',
    white: '#ffffff',
  },
  fonts: {
    /* Poppins (Google Web Fonts)
    bold: { fontFamily: 'Poppins_700Bold', fontWeight: '700' },
    medium: { fontFamily: 'Poppins_500Medium', fontWeight: '500' },
    light: { fontFamily: 'Poppins_300Light', fontWeight: '300' },
    regular: { fontFamily: 'Poppins_400Regular', fontWeight: '400' },
    thin: { fontFamily: 'Poppins_100Thin', fontWeight: '100' },
    */
    bold: { fontFamily: 'CircularStd-Bold' },
    medium: { fontFamily: 'CircularStd-Book' },
    regular: { fontFamily: 'CircularStd-Light' },
    light: { fontFamily: 'CircularStd-Light' },
    thin: { fontFamily: 'CircularStd-Light' },
  },
} as const;

const styles: any = StyleSheet.create({
  pageContainer: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  pageContent: {
    height: '100%',
    flex: 1,
  },
  pageActions: {
    display: 'flex',
    width: '100%',
    height: 41, // Make sure actionButtons is the same height!
    backgroundColor: 'transparent',
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
    fontSize: 22,
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
    fontSize: 15,
    fontFamily: theme.fonts.thin.fontFamily,
  },
  changeImageButton: {
    borderTopWidth: 0,
    borderRadius: 0,
    height: 39,
  },
  changeImageButtonLabel: {
    textTransform: 'none',
    fontWeight: '300',
    fontSize: 14,
  },
  deleteItemButton: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    borderColor: theme.colors.defaultBorder,
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
  },
  itemControls: {
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: theme.colors.defaultBorder,
    borderTopWidth: 1,
  },
});

export default styles;

export { theme };
