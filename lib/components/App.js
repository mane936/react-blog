import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';
if(typeof window !== 'undefined'){
  window.Perf = Perf;
}

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object,
  };
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  appState = () => {
    const { articles, searchTerm } = this.props.store.getState();
    // appState function is to optimize performance.
    // Is made to avoid App to rerender as many times as the store changes its state.
    console.log('appstate');
    return { articles, searchTerm };
  }
  state = this.appState();
  onStoreChange = () => {
    this.setState(this.appState);
  }

  shouldComponentUpdate(nextProps, nextState){
    return (this.state.articles !== nextState.articles) || (this.state.searchTerm !== nextState.searchTerm );
  }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    // we save this subscriptionId so the componentWillUnmount can access.
    this.props.store.clockStart();

    setImmediate(() => {
      Perf.start();
    });
    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);

  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    // debugger; we can use a debugger here to see how the page is rendering part py part
    let { articles, searchTerm } = this.state;
    let searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRE) || value.body.match(searchRE);
      });
    }
    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }

}

export default App;
