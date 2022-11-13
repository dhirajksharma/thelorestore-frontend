import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { resetPassReducer, userReducer } from './reducers/userReducer';
import { dashboardReducer } from './reducers/dashboardReducer';
import { orderReducer } from './reducers/orderReducer';

const reducer =combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    forgotPassword:resetPassReducer,
    dashboard:dashboardReducer,
    orderDetails:orderReducer,
});

let initialState={};

const middleware=[thunk];

const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;