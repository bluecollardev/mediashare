import * as React from 'react';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
export const SPINNER_DEFAULTS = { initialMessage: '', loadingState: true } as const;
export const useSpinner = function ({ initialMessage, loadingState }: { initialMessage?: string; loadingState?: boolean } = SPINNER_DEFAULTS) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  let timer;

  const startLoad = () => {
    setIsLoading(true);
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const endLoad = () => {
    setIsLoading(false);
    clearTimeout(timer);
  };

  const AppSpinner = () => <Spinner visible={isLoading} textContent={message} />;

  return [{ endLoad, startLoad, isLoading, AppSpinner, setMessage }];
};
