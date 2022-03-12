// This resolves an error which occurs in environments where the standard crypto.getRandomValues() API is not supported.
// This issue can be resolved by adding the react-native-get-random-values polyfill:
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export function createRandomRenderKey() {
  return uuid();
}
