export default function checkLoginState() {
  let self = this;
  FB.getLoginStatus(function(response) {
    self.statusChangeCallback(response);
  });
}
