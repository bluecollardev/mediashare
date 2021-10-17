import { UPDATE_TOAST } from '../actionTypes';

export default function updateToast({ dispatchGlobalStateUpdate, toast }) {
  dispatchGlobalStateUpdate({
    type: UPDATE_TOAST,
    payload: toast,
  });
}
