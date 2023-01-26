import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { positions, transitions, Provider as alertProvider } from 'react-alert';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//----------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = { //options for error Alert template
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition:transitions.SCALE
}


root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
