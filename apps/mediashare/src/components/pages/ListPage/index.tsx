import React from 'react';
import { connect } from 'react-redux';

import { Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Title, View } from 'native-base';

import styles from '../../../styles';

export interface ListPageProps {
  navigation: any;
  list: any;
}

export interface ListPageState {}

export class ListPage extends React.Component<ListPageProps, ListPageState> {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                // TODO: Fix this!
                // this.props.navigation.openDrawer();
              }}
            >
              <Icon name="search-outline" />
            </Button>
          </Left>
          <Body>
            <Title>List Page</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <List>
              {this.props.list.map((item, i) => (
                <ListItem
                  key={`item-${i}`}
                  onPress={() =>
                    this.props.navigation.navigate('Blank Page', {
                      name: { item },
                    })
                  }
                >
                  <Text>{item}</Text>
                </ListItem>
              ))}
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export interface ListPageProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ListPageState {}

export class ListPageContainer extends React.Component<ListPageProps, ListPageState> {
  componentDidMount() {
    // this.props.fetchList();
  }
  render() {
    return null;
    // return <ListPage navigation={this.props.navigation} list={this.props.data} />;
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchList: (url: any) => dispatch(fetchList(url)),
  };
}

const mapStateToProps = (state: any) => ({
  data: state.listPage.list,
  isLoading: state.listPage.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPageContainer);
