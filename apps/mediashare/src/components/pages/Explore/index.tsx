import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, View } from 'native-base';
import { ListItemGroup } from '../../layout/ListItemGroup';
import { MediaListItem } from '../../layout/MediaListItem';
import { routeConfig } from '../../../routes';

import styles from '../../../styles';

export interface ExploreProps {
  navigation: any;
  list: any;
}

export interface ExploreState {}

class Explore extends React.Component<ExploreProps, ExploreState> {
  render() {
    const { navigation } = this.props;
    const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Playlist 1', description: '9 Videos', image: imageSrc },
      { title: 'Playlist 2', description: '2 Videos', image: imageSrc },
    ];
    const items2 = [
      { title: 'Playlist 3', description: '3 Videos', image: imageSrc },
      { title: 'Playlist 4', description: '6 Videos', image: imageSrc },
    ];

    return (
      <Container style={styles.container}>
        <Content>
          {/* <View padder>
            <MediaCard />
          </View> */}
          {/*<Accordion dataArray={dataArray} expanded={0} />*/}
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Playlists by Bob Johnson'} />
              {items1.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() => navigation.navigate(routeConfig.playlistDetail.name)}
                  />
                );
              })}
              <ListItemGroup key={'group2'} text={'Playlists by Jane Doe'} />
              {items2.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                    onViewDetail={() => navigation.navigate(routeConfig.playlistDetail.name)}
                  />
                );
              })}
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export interface ExploreContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ExploreContainerState {}

class ExploreContainer extends React.Component<ExploreContainerProps, ExploreContainerState> {
  componentDidMount() {
    // this.props.fetchList(datas);
  }
  render() {
    return <Explore navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
    fetchList: (url) => console.log(url),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.explore ? state.explore.list : [],
  isLoading: state && state.explore ? state.explore.isLoading : false,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
