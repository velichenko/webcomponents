import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

const enhancer = applyMiddleware(thunk, logger);

export default createStore(reducer, enhancer);
