import { makeActions, makeEnum } from '../../core/factory';

const MEDIA_ITEM_ACTIONS = ['ADD_MEDIA_ITEM', 'REMOVE_ MEDIA_ITEM', 'GET_ MEDIA_ITEM', 'FIND_ MEDIA_ITEM'] as const;

const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);

const mediaItemItemActions = makeActions(MEDIA_ITEM_ACTIONS);

export { mediaItemActionTypes, mediaItemItemActions };
