import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/store/AuthProvider';
import store from './components/store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
