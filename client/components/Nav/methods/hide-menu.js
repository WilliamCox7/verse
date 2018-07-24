export default function hideMenu() {
  this.setState({showMenu: false}, () => {
    let navRef = document.getElementById('nav-ref');
    let navBack = document.getElementById('nav-back');
    let navAdd = document.getElementById('nav-add');
    let home = document.getElementById('Home');
    navRef.style.filter = '';
    navBack.style.filter = '';
    navAdd.style.filter = '';
    home.style.filter = '';
  });
}
