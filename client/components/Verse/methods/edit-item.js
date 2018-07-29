export default function editItem(item) {
  this.props.openModal(item.type, item);
  let newState = Object.assign({}, this.state);
  newState.options = {
    context: false,
    link: false,
    prophet: false,
    ruler: false,
    military: false,
    person: false,
    timeline: false,
    comment: false
  };
  this.setState(newState);
}
