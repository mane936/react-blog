
//This is called a higher order component.
// This is setting up a container for extracting the context.store from any component we pass to it.
import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps) => (Component) => {
// Usually we use class components for higher order components since normally they manage state, and use lifecycle methods.
  // return class extends React.Component {
  //   static displayName = `${Component.name}Container`;
  //   static contextTypes = {
  //     store: PropTypes.object,
  //   };
  //
  //   render() {
  //     <Component {...this.props} store={this.context.store} />;
  //   }
  // };


// But we can also do it as a functional component.

  const WithStore = (props, context) =>
    <Component
      {...props}
      {...extraProps(context.store, props)} 
      store={context.store}
    />;
  WithStore.contextTypes = {
    store: PropTypes.object,
  };

  // We need to put a name to the element we're rendering. Since it's confusing on the React Element Tree.
  WithStore.displayName = `${Component.name}Component`;
  return WithStore;
};

export default storeProvider;
