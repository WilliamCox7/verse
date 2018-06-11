export default function toggleAddSection(e) {
  if (e.touches[0].clientY > this.state.y + 20) {
    document.getElementById('nav-add-section').style.opacity = 0;
  } else if (e.touches[0].clientY < this.state.y - 20) {
    document.getElementById('nav-add-section').style.opacity = 1;
  }
}
