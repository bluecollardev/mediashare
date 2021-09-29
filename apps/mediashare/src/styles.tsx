import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import variable from '../src/theme/variables/platform';

type ThemeType = typeof DefaultTheme;

interface Theme extends ThemeType {
  colors: ThemeType['colors'] & {
    success: string;
    primaryLighter: string;
    accentDarker: string;
    accentLighter: string;
    primaryDarker: string;
    primaryText: string;
    primaryTextLighter: string;
    bgColor: string;
  };
}

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: variable.brandPrimary as string,
    accent: variable.brandInfo as string,
    success: variable.brandSuccess as string,
    error: variable.brandWarning as string,
    text: variable.primaryText,
    background: variable.segmentBackgroundColor,
    primaryLighter: variable.primaryLighter,
    accentDarker: variable.accentDarker,
    accentLighter: variable.accentLighter,
    primaryDarker: variable.primaryDarker,
    primaryText: variable.primaryText,
    primaryTextLighter: variable.primaryTextDarker,
    bgColor: variable.bgColor,
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
    margin: 0,
    height: '100%',
  },
  pageContent: {
    paddingTop: 5,
    paddingHorizontal: 5,
    height: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  pageActions: {
    display: 'flex',
    width: '100%',
    height: 50, // Make sure actionButtons is the same height!
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    height: 50, // Make sure this is the same height as pageActions!
    borderTopWidth: 1,
    borderColor: '#cccccc',
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
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: 1,
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.primaryText,
    borderBottomWidth: 1,
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
});

export default styles;

export { theme };
