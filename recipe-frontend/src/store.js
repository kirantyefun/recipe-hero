import { legacy_createStore as createstore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'


const initialState = {};
const middleWare = [thunk];

const store = createstore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;