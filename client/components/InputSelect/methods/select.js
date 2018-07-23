export default function select(option, name) {
  this.setState({selected: option.name});
  this.props.update(option, name);
}
