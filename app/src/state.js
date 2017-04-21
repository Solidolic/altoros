import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './reducers';
import promisesMiddleware from './middlewares/promises';
import logger from 'redux-logger';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(promisesMiddleware, logger)(createStore);

const store = createStoreWithMiddleware(reducer, {
    issuesOne: [],
    issuesTwo: []
});

export default store;

