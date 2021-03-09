import { ReducerMessage, StateAction } from '.';
import { LoginDto } from '../../api';

export interface LoginMessage extends StateAction<LoginDto> {
  payload: LoginDto;
}

export interface LoginReducerMessage extends ReducerMessage {
  action: LoginMessage;
}
