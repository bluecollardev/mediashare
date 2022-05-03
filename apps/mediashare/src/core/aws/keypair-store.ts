import * as SecureStore from 'expo-secure-store';

export type SecureStoreKeysType = 'token';

const setKeyPair = function (key: SecureStoreKeysType, value: string) {
  return SecureStore.setItemAsync(key, value);
};

const getKeyPair = function (key: SecureStoreKeysType) {
  return SecureStore.getItemAsync(key);
};

export { setKeyPair, getKeyPair };
