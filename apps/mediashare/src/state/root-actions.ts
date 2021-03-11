/* import { ErrorType } from '.';
import { LoginResponseDto } from '../api';
import { makeActions } from './core/actions';
export const ROOT_ACTIONS = ['LOGIN_RESPONSE_DTO', 'TOGGLE_LOADING', 'UPDATE_ERRORS', 'NAVIGATE', 'LOGIN_DTO'] as const;
export const RootActions: Record<typeof ROOT_ACTIONS[number], typeof ROOT_ACTIONS[number]> = ROOT_ACTIONS.reduce(
  (prev, curr) => ({ ...prev, [curr]: curr }),
  Object.create({})
);
export type RootActionsType = typeof ROOT_ACTIONS[number];

const { loginDto, toggleLoading, updateErrors, navigate, loginResponseDto } = makeActions(ROOT_ACTIONS);

const rootActions = {
  loginAction: (payload) => loginDto<LoginResponseDto>(payload),
  logoutAction: () => loginResponseDto(),
  toggleLoadingAction: () => toggleLoading(),
  updateErrorsAction: (payload) => updateErrors<ErrorType[]>(payload),
  navigateAction: (payload) => navigate<string>(payload),
};

export default rootActions; */

export {};
