import { createStore, combineReducers, applyMiddleware, compose } from "redux";

//Middlewares
import thunk from "redux-thunk";
import logger from "redux-logger";

//reducers
import UiReducer, { UiInitialState } from "./reducers/uiReducers";
import UserReducer, { UserInitialState } from "./reducers/userReducer";
import DataReducer, { DataInitialState } from "./reducers/dataReducers";

export interface GlobalState {
  ui: UiInitialState;
  user: UserInitialState;
  data: DataInitialState;
}

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const initialState = {};

const middlewares = [thunk, logger];

const rootReducers = combineReducers({
  ui: UiReducer,
  user: UserReducer,
  data: DataReducer,
});

//const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducers, initialState, null)
    : createStore(rootReducers, initialState, applyMiddleware(thunk));
