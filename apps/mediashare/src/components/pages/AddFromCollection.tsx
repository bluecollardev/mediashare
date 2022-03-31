import React, { useState } from 'react';
import { useAppSelector } from 'mediashare/store';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { PageContainer, PageContent, PageActions, PageProps, ActionButtons, MediaListItem } from 'mediashare/components/layout';

export interface AddFromCollectionProps extends PageProps {
  onViewDetail: () => void;
}

export interface AddFromCollectionState {}

export const AddFromCollection = ({ onViewDetail = () => {} }: AddFromCollectionProps) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const items = useAppSelector((state) => state?.mediaItems?.entities);

  return (
    <PageContainer>
      <PageContent>
        {items?.map((item) => {
          const { _id, title, description } = item;
          return (
            <MediaListItem
              key={`item_${_id}`}
              title={title}
              description={description}
              showThumbnail={false}
              checked={false}
              onChecked={(checked) => updateMediaItem(checked, item)}
              onViewDetail={onViewDetail}
            />
          );
        })}
      </PageContent>
      <PageActions>
        <ActionButtons onActionClicked={() => {}} onCancelClicked={() => {}} />
      </PageActions>
    </PageContainer>
  );

  function updateMediaItem(add: boolean, selected: any) {
    const updatedItems = add ? selectedPlaylists.concat([selected]) : selectedPlaylists.filter((item) => item._id !== selected._id);
    setSelectedPlaylists(updatedItems);
  }
};

export default withLoadingSpinner(undefined)(AddFromCollection);
