import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import variable from '../src/theme/variables/platform';

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
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
    ...DefaultTheme.fonts,
    // light: { fontFamily: 'Chalkboard SE', fontWeight: '400' },
    // medium: { fontFamily: 'Chalkboard SE', fontWeight: '700' },

    // regular: { fontFamily: 'Thonburi', fontWeight: '500' },
    // thin: { fontFamily: 'Chalkboard SE', fontWeight: '300' },
  },
};

export { theme };
