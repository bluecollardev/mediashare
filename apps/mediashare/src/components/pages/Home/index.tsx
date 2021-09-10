import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, View } from 'native-base';

import styles from '../../../styles';

export interface HomeProps {
  navigation: any;
  list: any;
}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <View padder>{/* <MediaCard /> */}</View>
        </Content>
      </Container>
    );
  }
}

export interface HomeContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface HomeContainerState {}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  componentDidMount() {
    // this.props.fetchList(datas);
  }
  render() {
    return <Home navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.home ? state.home.list : [],
  isLoading: state && state.home ? state.home.isLoading : false,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
