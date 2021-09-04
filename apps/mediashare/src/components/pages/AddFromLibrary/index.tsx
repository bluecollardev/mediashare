import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List } from 'native-base';

import { toggleMediaItem } from '../../../state/modules/media-items';

import { ListItemGroup } from '../../layout/ListItemGroup';
import { MediaListItem } from '../../layout/MediaListItem';

import { MediaItem } from '../../../rxjs-api';

export interface AddFromProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromState {}

export const AddFrom = ({ onViewDetail = () => {}, items }: AddFromProps) => {
  const dispatch = useDispatch();

  function toggleField(id: number) {
    dispatch(toggleMediaItem(id));
  }

  return (
    <List>
      <ListItemGroup key={'group1'} />
      {items.concat([]).map((item, idx) => {
        const { title, description, thumbnail } = item;
        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={thumbnail}
            checked={false}
            onChecked={() => toggleField(idx)}
            onViewDetail={onViewDetail}
          />
        );
      })}
    </List>
  );
};

export interface AddFromLibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface AddFromLibraryContainerState {}

class AddFromLibraryContainer extends React.Component<AddFromLibraryContainerProps, AddFromLibraryContainerState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    const data = [{ title: 'this is a title', description: 'this is a description', image: '' }];
    return null;
    // TODo: Fix this!
    // return <AddToPlaylist navigation={this.props.navigation} list={data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.playlistDetail ? state.playlistDetail.list : [],
  isLoading: state && state.playlistDetail ? state.playlistDetail.isLoading : [],
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFromLibraryContainer);
