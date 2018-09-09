export default function select(option, name) {
  this.setState({selected: option.name, options: []});
  this.props.update(option, name, this.props.array, this.props.index);
}
