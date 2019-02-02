import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
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
  storage: AsyncStorage,
  version: 0
};

const perReducer = persistReducer(persistConfig, reducers);
const store = createStore(perReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

// export const persistor = persistStore(store);
// export default () => {
// return { store, persistor };
// };
export default store;
