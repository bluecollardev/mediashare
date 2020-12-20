import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import HomeReducer from '../container/HomeContainer/reducer';
import ExploreReducer from '../container/ExploreContainer/reducer';

export default combineReducers({
  form: formReducer,
  HomeReducer,
  ExploreReducer
});
