import { UPDATE_GLOBAL_STATE, UPDATE_TOAST } from './actionTypes';

export default function reducer(state: { isConfirmLogoutModalOpen: any }, action: { type: any; payload: any }) {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_GLOBAL_STATE:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_TOAST:
      return {
        ...state,
        toast: payload,
      };
    default:
      throw new Error();
  }
}
