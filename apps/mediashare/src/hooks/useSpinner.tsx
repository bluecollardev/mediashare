import * as React from 'react';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
export const SPINNER_DEFAULTS = { initialMessage: '', loadingState: true } as const;
export const useSpinner = function ({ initialMessage, loadingState }: { initialMessage?: string; loadingState?: boolean } = SPINNER_DEFAULTS) {
  const [isLoading, setIsLoading] = useState(loadingState);
  const [message, setMessage] = useState(initialMessage);

  let timer;
  const startLoad = function () {
    setIsLoading(true);
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };
  const AppSpinner = () => <Spinner visible={isLoading} textContent={message} />;

  const endLoad = () => {
    setIsLoading(false);
    clearTimeout(timer);
  };

  return [{ endLoad, startLoad, isLoading, AppSpinner, setMessage }];
};
