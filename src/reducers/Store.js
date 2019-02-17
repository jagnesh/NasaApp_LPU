import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './index'
const Store = () => {
    return createStore(rootReducer,{}, applyMiddleware(ReduxThunk));
}

export default Store;