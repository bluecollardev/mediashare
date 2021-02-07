import { Orderable } from './abstract/orderable';

import { Video } from './media/video';
import { Audio } from './media/audio';
import { Document } from './media/document';

export type PlaylistItem = Video & Orderable | Audio & Orderable | Document & Orderable;
