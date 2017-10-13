/*
  Readable: index.js
  By Chris Leung

  Description:
  Renders the application to the DOM. Creates a Redux store (with Redux DevTools
  enabled for debugging the Redux store state) and passes the store to the
  app via the Provider component. Also wraps the app in React Router to keep the
  application in sync with the URL.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './style/index.css';
import App from './redux/components/App';
import reducer from './redux/reducers/'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
