import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
// @ts-ignore
import { LoadingOverlay } from '../LoadingOverlay';

/**
 * TODO: Get these added in!
 */
export interface LoadingSpinnerProps {
  onDataLoaded?: () => {};
  startLoad?: () => {};
  endLoad?: () => {};
}

const DEFAULT_TIMEOUT = 0.5 * 1000;

export const withLoadingSpinner = (stateSelector = (state: any) => state?.user?.loading) => (WrappedComponent: any) => (props: any) => {
  // const loading = useAppSelector((state) => state?.app.loading);
  const loading = useAppSelector(stateSelector);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    setIsLoading(true);
  }, [loading]);

  return (
    <>
      <LoadingOverlay show={isLoading} />
      <WrappedComponent {...props} />
    </>
  );
};
