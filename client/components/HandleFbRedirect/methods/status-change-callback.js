export default function statusChangeCallback(response) {
  let self = this;
  if (response.status === 'connected') {
    self.userId = response.authResponse.userID;
    FB.api(`/${self.userId}/picture`, 'GET', {
      "redirect": "false"
    }, function(response) {
      localStorage.setItem("user", JSON.stringify({userId: self.userId, url: response.data.url}));
      self.props.setUser(response.data.url, self.userId);
    });
    self.props.history.push('/');
  } else {
    self.props.history.push('/login');
  }
}
