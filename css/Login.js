import { StyleSheet, Dimensions } from 'react-native';
import { Vars } from './Vars';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const css = StyleSheet.create({
  Login: {
    flex: 1,
    backgroundColor: Vars.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 90
  },
  buttonContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    bottom: 90
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    backgroundColor: Vars.purple
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
