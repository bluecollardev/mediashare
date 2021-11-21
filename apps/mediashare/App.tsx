import React from 'react';
import { Provider } from 'react-redux';
import App from './src/app';
import { store } from './src/store';

export default function init() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
