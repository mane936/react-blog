import React, { Component } from 'react';

import ArticleList from './ArticleList';


class App extends Component {
  state = this.props.store.getState();

  render() {
    // debugger; we can use a debugger here to see how the page is rendering part py part
    return (
      <ArticleList
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }

}

export default App;
