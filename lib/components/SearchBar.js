import React from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

class SearchBar extends React.PureComponent {
  state = {
    searchTerm: '',
  }
  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300)

  handleSearch = (event) => {
    this.setState({searchTerm: event.target.value}, () => {
      this.doSearch();
    });
  }
  render() {
    return (
        <input
          type='search'
          placeholder="Enter search term"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
    );
  }
}

//options to handlesearch
/*
1. Use Refs (doesn't update STATE): we put into input:
    <input
    ref={(input) => this.searchInput = input} (...)
...and then in handleSearch:
    handleSearch = () => {
      console.log(this.searchInput.value);
    }
*/

export default storeProvider()(SearchBar);
