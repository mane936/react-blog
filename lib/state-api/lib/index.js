class StateApi {
  constructor(rawData) {
    this.data = { // this is the variable that will be shared with the components
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date(),
    };
    //When the state updates we need somehow to send the changes to the App.js.
    // To do so we could do this.emit('change'), that's what flux does.
    // But we'll do something simpler; what REDUX does:
      // variables for subscription (these variables are just for internal use of the StateApi)
    this.subscriptions = {};
    this.lastSubscriptionId = 0;
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date(),
      });
    }, 1000);
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  }

  getState = () => {
    return this.data;
  }

  // subscription functions:
  subscribe = (cb) => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId; //the resason why we return that is because we enable unsubscribe to read the lastSubscriptionId.
  };

  unsubscribe = (subscriptionId) => {
    // we need unsubscribe because if a component is unmounted we don't want this active listener to exist anymore.
    delete this.subscriptions[subscriptionId];
  };

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => {
      // console.log(cb);
      cb();
      // Explanation: this function is forcing App.js to get the state from Index.js, so that it rerenders. cb (callback) is just a pendant function executable from App.js saved into Index.js.
    });
  }

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange,
    };
    this.notifySubscribers();
  };

  setSearchTerm = (searchTerm) => {
    // this.setState({ searchTerm });  // TODO
    this.mergeWithState({
      searchTerm,
    });
  }


}

export default StateApi;
