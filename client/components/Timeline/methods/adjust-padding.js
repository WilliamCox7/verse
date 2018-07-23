export default function adjustPadding() {
  let timeline = document.getElementById(`timeline-${this.props.timeline._id}`);
  let h1 = document.getElementById(`h1-${this.props.timeline._id}`);
  let progress = document.getElementById(`progress-${this.props.timeline._id}`);
  let h1HalfWidth = h1.clientWidth / 2;
  if (h1HalfWidth > progress.clientWidth) {
    let padding = h1HalfWidth - progress.clientWidth;
    timeline.style.paddingLeft = padding + 11 + 'px';
  } else {
    timeline.style.paddingLeft = '11px';
  }
}
