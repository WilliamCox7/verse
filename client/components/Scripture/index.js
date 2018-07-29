import React from 'react';
import * as Pack from '../../exports/packages';
import * as Comp from '../../exports/components';
import * as Meth from './methods';
import './style.scss';

class Scripture extends Pack.Component {

  constructor() {
    super();
    this.changeIndex = this.changeIndex.bind(this);
  }

  render() {

    let verses = this.props.scripture.verses.map((verse, i) => {
      return <Comp.Verse verse={verse} key={i} delAddition={this.props.delAddition} setVerses={this.props.setVerses} scripture={this.props.scripture} />;
    });

    return (
      <div className="Scripture">
        {verses.length > 100 ? (
          <Pack.SwipeableViews children={verses} index={this.props.scripture.index}
            onChangeIndex={this.changeIndex} style={{'height': '100%'}}>
          </Pack.SwipeableViews>
        ) : null}
      </div>
    );
  }
}

Scripture.prototype.changeIndex = Meth.changeIndex;

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default Pack.connect(mapStateToProps)(Scripture);
