import * as Pack from '../../../exports/packages';

export default function deleteItem(id) {
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
  Pack.axios.delete(`/item/${id}`)
  .then((response) => {
    this.props.delAddition(id);
  });
}
