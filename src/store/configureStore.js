import rootReducer from '../reducers';
import thunk       from 'redux-thunk';
import DevTools    from 'containers/DevTools';
import createDebounce from 'redux-debounce';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

const config = {
  simple: 1000
};

export default function configureStore (initialState, debug = false) {
  let createStoreWithMiddleware;

  const debouncer = createDebounce(config);
  const middleware = applyMiddleware(thunk, debouncer);

  if (debug) {
    createStoreWithMiddleware = compose(
      middleware,
      DevTools.instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
