import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSpinner } from '../../hooks/useSpinner';
import { PageContainer } from '../layout/PageContainer';

// Load our data right before rendering
/* useEffect(() => {
  if (!loaded) {
    loadData(myAction, { params });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [loaded]); */

export const withLoadingSpinner = (WrapperComponent) => (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ loadingState: true });

  return (
    <PageContainer>
      {isLoading || !loaded ? <AppSpinner /> : null}
      <WrapperComponent {...props} loadData={loadData} isLoading={isLoading} startLoad={startLoad} endLoad={endLoad} />
    </PageContainer>
  );

  async function loadData(action, params) {
    await dispatch(action(params));
    setLoaded(true);
  }
};
