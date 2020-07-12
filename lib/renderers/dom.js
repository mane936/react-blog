import ReactDOM from 'react-dom';
import React from 'react';

import StateApi from 'state-api';
import App from 'components/App';
// This absolute path doesn't just work with pm2 in package.
// we need to do another fix into webpack.config.js
const store = new StateApi(window.initialData);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
