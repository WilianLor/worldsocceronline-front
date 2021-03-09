import ReactDOM from 'react-dom';
import App from './app';

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from './store/store.js'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>  
  </Provider>,
  document.getElementById('root')
);

