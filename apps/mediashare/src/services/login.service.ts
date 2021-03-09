import { Action } from 'redux';

import { LoginDto } from '../api';

export const login = (message: string) => async (dispatch, getState, api): Promise<Action> => {
  const request = { username: '', password: '' } as LoginDto;
  const response = await api.user.userControllerLogin(request).toPromise();

  return dispatch({ type: 'WHATEVER' });
};
