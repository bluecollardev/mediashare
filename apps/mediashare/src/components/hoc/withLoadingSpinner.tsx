import React, { useState } from 'react';

import { useSpinner } from '../../hooks/useSpinner';
import { PageContainer } from '../layout/PageContainer';

export interface LoadingSpinnerProps {
  onDataLoaded?: () => {};
  startLoad?: () => {};
  endLoad?: () => {};
}

export const withLoadingSpinner = (WrapperComponent) => (props) => {
  const [loaded, setLoaded] = useState(false);
  const [{ AppSpinner, isLoading, startLoad, endLoad }] = useSpinner({ loadingState: true });
  const onDataLoaded = () => setLoaded(true);

  return (
    <PageContainer>
      {isLoading || !loaded ? <AppSpinner /> : null}
      <WrapperComponent {...props} onDataLoaded={onDataLoaded} startLoad={startLoad} endLoad={endLoad} />
    </PageContainer>
  );
};
