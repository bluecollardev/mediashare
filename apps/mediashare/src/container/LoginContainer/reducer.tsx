import { Reducer } from 'redux';
import { LoginDto } from '../../api';
import { RootState } from '../../state';
import { Actions } from '../../state/models';
import { LoginMessage } from '../../state/models/Messages';

const login: Reducer<RootState, LoginMessage> = (state, action): RootState => {
  const { type, payload } = action;

  if (type === Actions.LOGIN) {
    return { ...state, loginDto: payload, isLoggedIn: false };
  }
};

export const loginAction = (dto: LoginDto): LoginMessage => ({ type: Actions.LOGIN, payload: dto });

export default login;
