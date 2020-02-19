import {createStore} from 'redux';
import {defaultReducer} from "./reducers";

const store = createStore(defaultReducer);

export default store;
