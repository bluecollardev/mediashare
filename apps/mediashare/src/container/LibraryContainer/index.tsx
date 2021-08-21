import { Storage } from 'aws-amplify';
import * as React from 'react';
import { connect } from 'react-redux';
import Library from '../../screens/Library';

import { findMediaItems } from '../../state/modules/media-items';
import { useState, useEffect } from 'react';
import { RootState } from '../../state/store';

export interface LibraryContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}
export interface LibraryContainerState {}
const LibraryContainer = (props: { navigation: any }) => {
  // componentDidMount() {
  //   const { fetchList } = this.props;
  //   fetchList();
  // }

  // const { state } = .props;
  const [data, setData] = useState([]);
  const loginAndStorage = async function () {
    const list = await Storage.list('');
    setData(list.map((itm) => ({ title: itm.key })));
  };

  console.log(props);

  useEffect(() => {
    loginAndStorage();
  }, []);
  return <Library navigation={props.navigation} list={data} />;
};

function mapDispatchToProps(dispatch: any) {
  return {
    fetchList: () => dispatch(findMediaItems(null)),
  };
}

const mapStateToProps = (state: RootState) => ({
  state: state,
  data: state?.userMediaItems?.userMediaItems ? state.userMediaItems.userMediaItems : [],
  isLoading: state && state.userMediaItems ? state.userMediaItems.isLoading : false,
});
export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
