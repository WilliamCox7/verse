import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { css } from '../css/Home';

class Home extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Home}>
        <Text>{this.props.user.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);
