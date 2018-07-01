import React from 'react';
import * as Pack from '../../exports/packages';
import * as Rdux from '../../exports/reducers';
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
      return <Comp.Verse verse={verse} key={i} />;
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
    scripture: state.scripture,
    user: state.user
  }
}

const mapDispatchToProps = {
  addScriptureToEnd: Rdux.addScriptureToEnd,
  addScriptureToStart: Rdux.addScriptureToStart,
  setReference: Rdux.setReference,
  setIndex: Rdux.setIndex
}

export default Pack.connect(mapStateToProps, mapDispatchToProps)(Scripture);
