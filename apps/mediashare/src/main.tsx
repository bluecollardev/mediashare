import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './Application';

export default function init() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
