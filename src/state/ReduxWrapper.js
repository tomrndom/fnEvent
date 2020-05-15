import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { loggedUserReducer } from 'openstack-uicore-foundation/lib/reducers';

import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import { PersistGate } from 'redux-persist/integration/react';

// const composeEnhancers = typeof window === 'object' && window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : compose;

console.log(loggedUserReducer)

const onBeforeLift = () => {
  console.log("reading state ...")
}

const config = {
  key: 'root_registration',
  storage,
}

const persistedReducers = persistCombineReducers(config, {
  loggedUserState: loggedUserReducer,
});

const composeEnhancers = typeof window === 'object' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(persistedReducers, composeEnhancers(applyMiddleware(thunk)));

const onRehydrateComplete = () => {
  // repopulate access token on global access variable
  if (typeof window === 'object') {    
    window.accessToken = store.getState().loggedUserState.accessToken;
    window.idToken = store.getState().loggedUserState.idToken;
    window.sessionState = store.getState().loggedUserState.sessionState;
  }
}

const persistor = persistStore(store, null, onRehydrateComplete);

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);