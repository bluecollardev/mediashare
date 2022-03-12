import React from 'react';
import { Provider } from 'react-redux';
import App from './Application';
import { store } from './store';

export default function init() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
