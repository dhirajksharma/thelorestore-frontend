import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOADING_USER_REQUEST,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    PASS_UPDATE_FAIL,
    PASS_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_SUCCESS,
    FORGOT_PASS_FAIL,
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_SUCCESS,
    RESET_PASS_FAIL,
    RESET_PASS_REQUEST,
    RESET_PASS_SUCCESS,
    LOAD_ORDERS_REQUEST,
    LOAD_ORDERS_SUCCESS,
    CLEAR_SUCCESS,
    CLEAR_MSG,
    ADD_TO_CART,
    CLEAR_CART_MSG
} from '../constants/userConstants'

export const userReducer=(state={user:{}}, action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGOUT_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            };
        case LOADING_USER_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated:false,
            };
        case LOAD_ORDERS_REQUEST:
                return{
                    ...state,
                    loading:true,
                    isAuthenticated:true,
                };
        
        case LOAD_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                orders:action.payload,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            };
        case PASS_UPDATE_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
            return{
                ...state,
                updateSuccess:true,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            };
        case PASS_UPDATE_FAIL:
        case PROFILE_UPDATE_FAIL:
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                error:action.payload
            };
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            };
        case LOAD_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload,
            };
        case ADD_TO_CART:
            return{
                ...state,
                cartSuccess:true
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        case CLEAR_SUCCESS:
            return{
                ...state,
                updateSuccess:false,
            }
        case CLEAR_CART_MSG:
            return{
                ...state,
                cartSuccess:false,
            }
        default:
            return state;
    }
}


export const resetPassReducer=(state={}, action)=>{
    switch (action.type) {
        case FORGOT_PASS_REQUEST:
        case RESET_PASS_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        
        case FORGOT_PASS_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload,
            }
        
        case RESET_PASS_SUCCESS:
            return{
                ...state,
                loading:false,
                success:action.payload,
            }

        case FORGOT_PASS_FAIL:
        case RESET_PASS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        case CLEAR_MSG:{
            return{
                ...state,
                message:null
            }
        }
        
        default:
            return state;
    }
}