import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { watchRows } from "./sagas";
import rowsReducer from "./reducers";

const rootReducer = combineReducers({
  rows: rowsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(watchRows);

export default store;