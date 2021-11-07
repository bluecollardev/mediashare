import { v4 as uuid } from 'uuid';

export function createRandomRenderKey() {
  return uuid();
}
