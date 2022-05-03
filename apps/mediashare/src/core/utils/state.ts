import * as R from 'remeda';
import { RootState } from 'mediashare/store';

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);

export const mergeState = (state: RootState) => <T>(item: T) => R.merge(cloneState(state), R.clone(item));
