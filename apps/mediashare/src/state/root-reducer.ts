/* eslint-disable @typescript-eslint/no-unused-vars */
import * as R from 'remeda';
import INITIAL_STATE, { RootState } from '.';
import { LoginResponseDto } from '../api';
import { ReducerDictionary, mergeState } from './core/reducer';
import { RootActionsType } from './root-actions';

const toggleLoading = function (state: RootState) {
  const { isLoading, ...rest } = state;

  return { ...R.clone(rest), isLoading: !isLoading };
};

const login = function (state: RootState, user: LoginResponseDto): RootState {
  const { isLoggedIn, loginResponseDto: prevUser, loginDto, ...rest } = state;
  if (!user) return state;
  return { isLoggedIn: true, loginResponseDto: user, loginDto: null, ...R.clone(rest) };
};

const rootReducerDict: ReducerDictionary<RootActionsType> = {
  updateErrors: (state, errors) => (errors ? state : mergeState(state)(errors)),
  loginResponseDto: login,
  toggleLoading,
  navigate: (state, nextPage) => {
    const { page: lastPage, ...rest } = state;
    return { ...rest, lastPage, page: nextPage };
  },
  loginDto: (state: RootState, dto) => {
    const { loginDto, ...rest } = state;
    return { loginDto: dto, ...rest };
  },
};

export default rootReducerDict;
