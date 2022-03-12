import { UPDATE_GLOBAL_STATE } from '../actionTypes';

export default function updateGlobalState(dispatchGlobalStateUpdate, payload) {
  dispatchGlobalStateUpdate({
    type: UPDATE_GLOBAL_STATE,
    payload,
  });
}
