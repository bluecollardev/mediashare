import { RootState } from '..';
import { ActionMessage } from './ActionMessage.model';

export interface ReducerMessage {
  state: RootState;
  action: ActionMessage;
}
