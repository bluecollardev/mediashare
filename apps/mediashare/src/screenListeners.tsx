/**
 * This maybe isn't the best solution (notice the "dangerouslyGetState") but it doers seem to work well enough.
 * This solution is built on top of the solution provided in this Github issue.
 * https://source--react-navigation-docs.netlify.app/docs/use-navigation-state/
 */
import { StackActions } from '@react-navigation/native';
// https://github.com/react-navigation/react-navigation/issues/8583
// const TAB_TO_RESET = 'HomeTab';
export const bottomTabListeners = ({ navigation }) => ({
  tabPress: (e) => {
    /* TODO: Prevent default action
    if (!user.firstName) {
      e.preventDefault();
    } */
    const navigationState = navigation.getState();
    if (navigationState) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = navigationState.routes.filter((r) => r.key !== e.target);
      nonTargetTabs.forEach(({ key, state }) => {
        // Pass the stack key that we want to reset and use popToTop to reset it
        if (state && state.index !== 0) {
          navigation.dispatch(StackActions.popToTop, {
            target: key,
          });
        }
      });
    }
  },
});
