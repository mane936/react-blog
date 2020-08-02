import React, { PureComponent } from 'react';
import storeProvider from './storeProvider';

class Timestamp extends PureComponent {

  //The next is for debouncing TimeStamp rendering for changes only in minutes.
  static timeDisplay = timestamp =>
    timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  render() {
    return (
      <div>
        {this.props.timestampDisplay}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp),
  };
}

export default storeProvider(extraProps)(Timestamp);
