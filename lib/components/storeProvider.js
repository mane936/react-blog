
//This is called a higher order component.
// This is setting up a container for extracting the context.store from any component we pass to it.
import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
// Usually we use class components for higher order components since normally they manage state, and use lifecycle methods.
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };

    usedState = () => {
      return extraProps(this.context.store, this.props);
    }

    state = this.usedState();

    onStoreChange = () => {
      if(this.subscriptionId) {
        // this.forceUpdate(); //This is forcing update for all components
        this.setState(this.usedState());
      }
    }
    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }
    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
      this.subscriptionId = null;
    }

    render() {
      return <Component
        {...this.props}
        {...this.usedState()}
        store={this.context.store} />;
    }
  };
};
export default storeProvider;

// But we can also do it as a functional component.

//   const WithStore = (props, context) =>
//     <Component
//       {...props}
//       {...extraProps(context.store, props)}
//       store={context.store}
//     />;
//   WithStore.contextTypes = {
//     store: PropTypes.object,
//   };
//
//   // We need to put a name to the element we're rendering. Since it's confusing on the React Element Tree.
//   WithStore.displayName = `${Component.name}Component`;
//   return WithStore;
// };
