import {
 ADD_PRODUCT_FAIL,
 ADD_PRODUCT_REQUEST,
 ADD_PRODUCT_SUCCESS,
 CLEAR_ERRORS,
 CLEAR_PRODUCT_SUCCESS,
 MY_ORDERS_FAIL,
 MY_ORDERS_REQUEST,
 MY_ORDERS_SUCCESS,
 MY_PRODUCTS_FAIL,
 MY_PRODUCTS_REQUEST,
 MY_PRODUCTS_SUCCESS,
 MY_STATS_FAIL,
 MY_STATS_REQUEST,
 MY_STATS_SUCCESS,
 UPDATE_PRODUCT_FAIL,
 UPDATE_PRODUCT_REQUEST,
 UPDATE_PRODUCT_SUCCESS
} from '../constants/dashboardConstants'

export const dashboardReducer=(state={}, action)=>{
    switch(action.type){
        
        case MY_STATS_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case ADD_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case MY_ORDERS_REQUEST:
            return{
                ...state,
                error:null,
                ordersLoading:true,
            }
        case MY_PRODUCTS_REQUEST:
            return{
                ...state,
                error:null,
                productsLoading:true,
            }
        case ADD_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                productSuccess:true,
            }
        
        case MY_ORDERS_SUCCESS:
            return{
                ...state,
                ordersLoading:false,
                orders:action.payload
            }
        
        case MY_PRODUCTS_SUCCESS:
            return{
                ...state,
                productsLoading:false,
                products:action.payload
            }
        
        case MY_STATS_SUCCESS:
            return{
                ...state,
                loading:false,
                stats:action.payload
            }
        
        case ADD_PRODUCT_FAIL:
        case MY_ORDERS_FAIL:
        case MY_PRODUCTS_FAIL:
        case MY_STATS_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        
        case CLEAR_PRODUCT_SUCCESS:
            return{
                ...state,
                productSuccess:false,
            }
        default:
            return state;
    }
}