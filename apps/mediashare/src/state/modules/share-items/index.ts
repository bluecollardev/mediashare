import { makeActions, makeEnum } from '../../core/factory';

const SHARE_ITEM_ACTIONS = [
  'ADD_SHARE_ITEMS',
  'REMOVE_SHARE_ITEMS',
  'GET_SHARE_ITEMS',
  'FIND_SHARE_ITEM',
  'UPDATE_SHARE_ITEMS',
] as const;

const ShareItemActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

const shareItemActions = makeActions(SHARE_ITEM_ACTIONS);

export { ShareItemActionTypes, shareItemActions };
