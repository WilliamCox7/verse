import * as Pack from '../../../exports/packages';

export default function updateOptions(e) {
  this.setState({selected: e.target.value});
  Pack.axios.get(`/people/${e.target.value}`)
  .then((response) => {
    this.setState({options: response.data});
  });
}
