import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import reducer from './Reducers';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);
export { store};