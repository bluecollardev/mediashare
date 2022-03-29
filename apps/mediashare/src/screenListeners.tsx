import { StackActions } from '@react-navigation/native';
import { GlobalStateProps, INITIAL_SEARCH_FILTERS } from './core/globalState/index';
// Note re: popToTop https://github.com/react-navigation/react-navigation/issues/8583
export const createBottomTabListeners =
  (globalState: GlobalStateProps) =>
  ({ navigation }) => ({
    tabPress: (e) => {
      const navigationState = navigation.getState();
      if (navigationState) {
        // First clear all search params from globalState
        globalState?.setSearchFilters(INITIAL_SEARCH_FILTERS);
        // Now, reset tabs, and update stack
        // First grab all the tabs that are NOT the one we just pressed
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
