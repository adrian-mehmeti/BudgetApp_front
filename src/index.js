import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { store } from './lib/store/store';
import { Provider } from 'react-redux';

import { persistStore } from 'reduxjs-toolkit-persist';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
