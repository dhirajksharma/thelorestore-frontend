import {CLEAR_DELETE_MSG,
    CLEAR_ERRORS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FOUND,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_SUCCESS
} 
from '../constants/orderConstants'

export const orderReducer=(state={order:{}}, action)=>{
    switch (action.type){
        case ORDER_DETAILS_REQUEST:

        return{
            loading:true,
            ...state,
        }
        
        case ORDER_DETAILS_FOUND:
            return{
                loading:false,
                order:action.payload,
            }
        case ORDER_DETAILS_FAIL:
        
        return{
            loading:false,
            error:action.payload,
        }
        case ORDER_DELETE_FAIL:
            return{
                ...state,
                error:action.payload
            }
        case ORDER_DELETE_SUCCESS:
            return{
                orderDeleted:true,
            }

        case CLEAR_DELETE_MSG:
            return{
                ...state,
                orderDeleted:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }

        default:
            return state;
    }
}