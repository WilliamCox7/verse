import React from 'react';
import * as Pack from '../../exports/packages';
import * as Rdux from '../../exports/reducers';
import { Context, Person, Link, SelectPerson, Timeline, Comment } from './forms';
import './style.scss';

class Modal extends Pack.Component {

  constructor() {
    super();
    this.state = {
      error: ""
    }
    this.buildForm = this.buildForm.bind(this);
    this.save = this.save.bind(this);
    this.error = this.error.bind(this);
  }

  buildForm(type) {
    let verse = this.props.scripture.verses[this.props.scripture.index];
    switch(type) {
      case 'context': return <Context save={this.save} error={this.error} verse={verse} />;
      case 'person': return <Person save={this.save} error={this.error} />;
      case 'link': return <Link save={this.save} error={this.error} />;
      case 'military': return <SelectPerson save={this.save} type={type} error={this.error} />;
      case 'prophet': return <SelectPerson save={this.save} type={type} error={this.error} />;
      case 'ruler': return <SelectPerson save={this.save} type={type} error={this.error} />;
      case 'timeline': return <Timeline save={this.save} error={this.error} />;
      case 'comment': return <Comment save={this.save} error={this.error} />;
    }
  }

  save(form) {
    form.userId = this.props.user.userId;
    form.refId = this.props.scripture.refId;
    let table = this.props.type === 'person' ? 'person' : 'additions';
    Pack.axios.post(`/upsert/${table}`, form).then((response) => {
      this.setState({error: ""}, () => {
        this.props.closeModal();
        this.props.addAddition(form);
      });
    });
  }

  error(message) {
    this.setState({error: message});
  }

  render() {

    let form = this.buildForm(this.props.type);

    return (
      <div className="Modal">
        <div className="modal-nav flex ai-c jc-fe">
          <span onClick={this.props.closeModal}>X</span>
        </div>
        <div className="modal-form">
          {form}
        </div>
        {this.state.error ? (
          <div className="error-message">
            {this.state.error}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    scripture: state.scripture
  }
}

const mapDispatchToProps = {
  addAddition: Rdux.addAddition
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Modal);
