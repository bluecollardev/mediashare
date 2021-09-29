import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { loadUsers } from '../../state/modules/users';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';
import { UserDto } from '../../rxjs-api';
import { findInArray } from '../../utils';

const MediaItemDetail = ({}: PageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [createdBy, setCreatedBy] = useState({} as UserDto);

  const mediaItem = useAppSelector((state) => state.mediaItem?.mediaItem);
  const { title, description, category, author, uri, thumbnail, userId } = mediaItem || {};
  const users = useAppSelector((state) => state.users?.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      loadData().then(() => {
        setCreatedBy(findInArray(users, '_id', userId));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userId]);

  return (
    <PageContainer>
      <PageContent>
        <MediaCard
          title={title}
          author={author}
          createdBy={createdBy}
          description={description}
          mediaSrc={uri}
          thumbnail={thumbnail}
          showThumbnail={true}
          category={category}
          showSocial={true}
          showActions={false}
          isPlayable={true}
          // likes={likesCount}
          // shares={shareCount}
          // views={viewCount}
        />
      </PageContent>
    </PageContainer>
  );

  async function loadData() {
    await dispatch(loadUsers());
    setIsLoaded(true);
  }
};

export default withLoadingSpinner(MediaItemDetail);
