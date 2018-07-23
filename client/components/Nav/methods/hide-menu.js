export default function hideMenu() {
  this.setState({showMenu: false}, () => {
    let navRef = document.getElementById('nav-ref');
    let navLogo = document.getElementById('nav-logo');
    let navAdd = document.getElementById('nav-add');
    let home = document.getElementById('Home');
    navRef.style.filter = '';
    navLogo.style.filter = '';
    navAdd.style.filter = '';
    home.style.filter = '';
  });
}
