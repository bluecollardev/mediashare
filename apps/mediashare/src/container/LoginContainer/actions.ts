import { LoginDto } from '../../api';
import { Actions } from '../../state/models';
import { LoginMessage } from '../../state/models/Messages';

export const loginAction = ({ username, password }: LoginDto): LoginMessage => ({
  type: Actions.LOGIN,
  login: { username, password },
});
