import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; //Merge lvl 2 shallow merges two levels
import reducers from "../reducers";
import { AsyncStorage } from "react-native";

// Middleware that logs actions
// Usefull for debug !
const middlewares = [thunkMiddleware];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const perReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  perReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export const persistor = persistStore(store);
