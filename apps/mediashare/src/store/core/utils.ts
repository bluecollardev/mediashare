/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
import { RootState } from '../index';
import * as R from 'remeda';

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);
export const mergeState = (state: RootState) => <T>(item: T) => R.merge(cloneState(state), R.clone(item));
