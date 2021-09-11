import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import variable from '../src/theme/variables/platform';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
    height: '100%',
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

export { theme };
