import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { ProductReducer } from "./products/reducer";
import { LoginAuthreducer } from "./LoginAuth/reducer";

const rootReducer = combineReducers({
  ecommerceData: ProductReducer,
  LoginAuth:LoginAuthreducer,
});
console.log(rootReducer);

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

console.log("stores",store.getState());
