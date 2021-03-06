import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../root-reducer";

const logger = createLogger();

function configureStore(initialState?: object) {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  // configure middlewares
  const middlewares = [thunk, logger];
  // compose enhancers
  const enhancer = applyMiddleware(...middlewares);
  // create store

  return createStore(rootReducer, initialState, composeEnhancers(enhancer));
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

if (module.hot) {
  module.hot.accept("../root-reducer", () => {
    const nextReducer = require('../root-reducer').default;
    store.replaceReducer(nextReducer);
  });
}

// export store singleton instance
export default store;
