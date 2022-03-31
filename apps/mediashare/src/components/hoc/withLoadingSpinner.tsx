import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'mediashare/store';
import { LoadingOverlay } from 'mediashare/components/layout/LoadingOverlay';

export interface LoadingSpinnerProps {
  startLoad?: () => {};
  endLoad?: () => {};
}

/**
 * A state-aware loading screen component.
 *
 * Here is an example of waiting for an array to be loaded with entities:
 * export default withLoadingSpinner((state) => {
 *   return !(Array.isArray(state?.something?.myArray) && state?.something?.myArray?.length > 0)
 * })(withGlobalStateConsumer(WhateverComponentYouWantToWrap))
 *
 * Here is an example of waiting for the loaded property (eg. reducePendingState / reduceFulfilledState)
 * export default withLoadingSpinner((state) => {
 *   return !state?.something?.loading && state?.something?.loaded)
 * })(withGlobalStateConsumer(WhateverComponentYouWantToWrap))
 *
 * @param stateSelector
 */
export const withLoadingSpinner = (stateSelector = (state: any) => state?.user?.loading) => {
  return function LoadingSpinnerWrapper(WrappedComponent: any) {
    return function LoadingSpinner(
      {
        startLoad = () => undefined,
        endLoad = () => undefined,
        ...rest
      }: LoadingSpinnerProps & any) {
      const loading = useAppSelector(stateSelector);
      if (!loading) startLoad();
      const [isLoading, setIsLoading] = useState(loading);

      useEffect(() => {
        if (!loading) {
          setIsLoading(false);
          endLoad();
        }
      }, [loading]);

      return (
        <>
          <LoadingOverlay show={isLoading} />
          <WrappedComponent {...rest} />
        </>
      );
    };
  };
};
