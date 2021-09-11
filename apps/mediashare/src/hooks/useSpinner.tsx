import * as React from 'react';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export const useSpinner = function () {
  const [isLoading, setIsLoading] = useState(false);

  let timer;
  const startLoad = function () {
    setIsLoading(true);
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };
  const AppSpinner = () => <Spinner visible={isLoading} textContent={'Loading...'} />;

  const endLoad = () => {
    setIsLoading(false);
    clearTimeout(timer);
  };

  return [{ endLoad, startLoad, isLoading, AppSpinner }];
};
