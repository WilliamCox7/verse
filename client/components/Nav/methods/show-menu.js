export default function showMenu() {
  this.setState({showMenu: true}, () => {
    let navRef = document.getElementById('nav-ref');
    let navBack = document.getElementById('nav-back');
    let navAdd = document.getElementById('nav-add');
    let home = document.getElementById('Home');
    navRef.style.filter = 'blur(5px)';
    navBack.style.filter = 'blur(5px)';
    navAdd.style.filter = 'blur(5px)';
    home.style.filter = 'blur(5px)';
  });
}
