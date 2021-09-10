import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Content, Icon, Text, View } from 'native-base';

import { ContactList } from '../../layout/ContactList';

import styles from '../../../styles';

export interface ShareWithProps {
  navigation: any;
  list: any;
}

export interface ShareWithState {}

class ShareWith extends React.Component<ShareWithProps, ShareWithState> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <ContactList
              showGroups={true}
            />
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              danger
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}>
              <Icon name="close-outline" />
              <Text style={{ paddingRight: 30 }}>Cancel</Text>
            </Button>
            <Button
              iconLeft
              bordered
              disabled
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center'
              }}>
              <Icon name="checkmark" />
              <Text style={{ paddingRight: 30 }}>Share</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export interface ShareWithContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ShareWithContainerState {}

class ShareWithContainer extends React.Component<ShareWithContainerProps, ShareWithContainerState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    return <ShareWith navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state && state.playlistDetail ? state.playlistDetail.list : [],
  isLoading: state && state.playlistDetail ? state.playlistDetail.isLoading : false,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareWithContainer);
