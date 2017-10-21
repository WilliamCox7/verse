import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { setUser } from '../redux/user';
import { css } from '../css/Login';

class Login extends React.Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
  }

  auth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((status) => {
      AccessToken.getCurrentAccessToken().then((data) => {
        new GraphRequestManager().addRequest(new GraphRequest('/me', {
          accessToken: data.accessToken,
          parameters: {
            fields: {
              string: 'email, name, first_name, last_name, picture'
            },
          }
        }, (error, profile) => {
          if (error) { console.log(error); }
          else {
            this.props.setUser(profile);
            this.props.navigation.navigate('Home');
            console.log(profile);
          }
        })).start();
      });
    });
  }

  render() {
    return (
      <View style={css.Login}>
        <Image style={css.logo} resizeMode="contain"
          source={require('../src/logo.png')} />
        <View style={css.buttonContainer}>
          <TouchableOpacity style={css.button} activeOpacity={0.9} onPress={this.auth}>
            <Text style={css.buttonText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  setUser: setUser
}

export default connect(null, mapDispatchToProps)(Login);
