import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from '.';

const composeEnhancers = typeof window === 'object' && window.REDUX_DEVTOOLS_EXTENSION ? window.REDUX_DEVTOOLS_EXTENSION() : compose;

const createReduxStore = (preloadedState = {}) => createStore(rootReducer, preloadedState, composeEnhancers)

export default ({ element }) => (
  <Provider store={createReduxStore()}>{element}</Provider>
);