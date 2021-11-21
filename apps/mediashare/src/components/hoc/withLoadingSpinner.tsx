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

export const withLoadingSpinner = (WrapperComponent: any) => (props: any) => {
  // const loading = useAppSelector((state) => state?.app.loading);
  const loading = useAppSelector((state: any) => state?.user?.loading);
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
      <WrapperComponent {...props} />
    </>
  );
};
