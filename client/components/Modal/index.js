import React from 'react';
import * as Pack from '../../exports/packages';
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
    switch(type) {
      case 'context': return <Context save={this.save} error={this.error} item={this.props.item} />;
      case 'person': return <Person save={this.save} error={this.error} item={this.props.item} />;
      case 'link': return <Link save={this.save} error={this.error} item={this.props.item} />;
      case 'military': return <SelectPerson save={this.save} type={type} error={this.error} item={this.props.item} />;
      case 'prophet': return <SelectPerson save={this.save} type={type} error={this.error} item={this.props.item} />;
      case 'ruler': return <SelectPerson save={this.save} type={type} error={this.error} item={this.props.item} />;
      case 'timeline': return <Timeline save={this.save} error={this.error} item={this.props.item} />;
      case 'comment': return <Comment save={this.save} error={this.error} item={this.props.item} />;
    }
  }

  save(form, table) {
    let toSave = {};
    if (table === 'military' || table === 'ruler' || table === 'prophet') {
      toSave.personId = form[table]._id;
      toSave.type = table;
      toSave._id = form._id;
    } else {
      toSave = form;
    }
    toSave.userId = this.props.user.userId;
    toSave.refId = this.props.scripture.refId;
    Pack.axios.post(`/upsert/${table}`, toSave)
    .then((response) => {
      this.setState({error: ""}, () => {
        this.props.closeModal();
        if (table === 'military' || table === 'ruler' || table === 'prophet') {
          toSave = Object.assign({}, form[table], toSave);
        }
        if (response.data.nModified) {
          this.props.setItem(toSave);
          this.props.updAddition(toSave);
        } else {
          toSave._id = response.data._id;
          toSave.mapId = response.data.mapId;
          this.props.addAddition(toSave);
        }
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
        <div className="modal-nav">
          <div className="modal-nav-wrapper flex ai-c jc-fe">
            <span onClick={this.props.closeModal}>X</span>
          </div>
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
    user: state.user
  }
}

export default Pack.connect(mapStateToProps)(Modal);
