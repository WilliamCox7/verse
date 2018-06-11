export default function login() {
  let self = this;
  FB.login(function(response) {
    if (response.status === 'connected') {
      self.props.history.push('/');
    } else {
      self.props.history.push('/login');
    }
  });
}
