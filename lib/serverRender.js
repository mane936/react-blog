import React from 'react';
import ReactDOMServer from 'react-dom/server'; // this can render a react application into a string.

import App from './components/App';

const serverRender = () => {
  return ReactDOMServer.renderToString(
    <App />
  );
};

export default serverRender;

 /* Explanations on server Rendering
1. Benefits: The client will directly have a rendered page from the server. This implies:
  - Browser optimization, since the browser can see how really is the page. (browsers don't use javascript)
  - Client optimization, specially on low connection clients.
2. Operation: react will only render those things that change from the server rendered version (interactions with javascript)
3. Performance testing: we can check setting "Network" to Disable Cache, and "Performance" to "CPU Slowdown x20".
  - Result: With serverRendering We see how the page is immediately rendered, but the cpu will still try to do something, but we already will be able to use the page.
  - With client rendering we see how the page takes much much longer to render. Lower optimization on search engines.

 */
