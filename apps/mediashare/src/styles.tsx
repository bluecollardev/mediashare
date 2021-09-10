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
  colors: ThemeType['colors'] & { success: string };
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
    text: variable.brandPrimary,
    background: variable.segmentBackgroundColor,
  },
  fonts: {
    light: { fontFamily: variable.btnFontFamily, fontWeight: '400' },
    medium: { fontFamily: variable.btnFontFamily, fontWeight: '700' },

    regular: { fontFamily: variable.btnFontFamily, fontWeight: '500' },
    thin: { fontFamily: variable.btnFontFamily, fontWeight: '300' },
  },
};

export { theme };
