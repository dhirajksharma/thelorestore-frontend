import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOADING_USER_REQUEST,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_ORDERS_FAIL,
    LOAD_ORDERS_REQUEST,
    LOAD_ORDERS_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    PASS_UPDATE_FAIL,
    PASS_UPDATE_REQUEST,
    PASS_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    FORGOT_PASS_FAIL,
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_SUCCESS,
    RESET_PASS_FAIL,
    RESET_PASS_REQUEST,
    RESET_PASS_SUCCESS,
    CLEAR_SUCCESS,
    CLEAR_MSG,
    ADD_TO_CART,
    CLEAR_CART_MSG
} from '../constants/userConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const login=(details)=> async (dispatch)=>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        });
        
        const {data}=await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/login`,
            {email:details.email, password:details.password}
        );
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        })

    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}

export const register=(details)=> async (dispatch)=>{
    try {
        dispatch({
            type:REGISTER_REQUEST
        });
        
        const {data}=await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/register`,
            {name:details.name, email:details.email, password:details.password}
        );

        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user,
        })

    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
}

export const loadUser=()=> async (dispatch)=>{
    try {
        dispatch({
            type:LOADING_USER_REQUEST
        });
        
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me`);

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        })

    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
        })
    }
}

export const logout=()=> async (dispatch)=>{
    try {
        dispatch({
            type:LOGOUT_REQUEST
        });
        
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`);

        dispatch({
            type:LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updatePass=(details)=> async (dispatch)=>{
    try {
        dispatch({
            type:PASS_UPDATE_REQUEST
        });
        
        const {data}=await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/update`,
            {oldPassword:details.oldPassword, newPassword:details.newPassword, confirmPassword:details.confirmPassword}
        );

        dispatch({
            type:PASS_UPDATE_SUCCESS,
            payload:data.user,
        })

    } catch (error) {
        dispatch({
            type:PASS_UPDATE_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateProfile=(details)=> async (dispatch)=>{
    try {
        dispatch({
            type:PROFILE_UPDATE_REQUEST
        });

        const {data}=await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/me/update`,
            {   name:details.name,
                email:details.email,
                phone:details.phone,
                role:details.role,
                address:{
                    localaddress:details.address.localaddress,
                    city:details.address.city,
                    state:details.address.state,
                    pincode:details.address.pincode
                }
            }
        );

        dispatch({
            type:PROFILE_UPDATE_SUCCESS,
            payload:data.user,
        })

    } catch (error) {
        dispatch({
            type:PROFILE_UPDATE_FAIL,
            payload:error.response.data.message
        })
    }
}

export const forgotPassword=(email)=> async (dispatch)=>{
    try {
        dispatch({
            type:FORGOT_PASS_REQUEST
        });
        
        const {data}=await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/forgot`,
            {email:email}
        );

        dispatch({
            type:FORGOT_PASS_SUCCESS,
            payload:data.message,
        })

    } catch (error) {
        dispatch({
            type:FORGOT_PASS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const resetPass=(details,token)=> async (dispatch)=>{
    try {
        dispatch({
            type:RESET_PASS_REQUEST
        });
        
        const {data}=await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/reset/${token}`,
            {password:details.password, confirmpassword:details.confirmpassword}
        );

        dispatch({
            type:RESET_PASS_SUCCESS,
            payload:data.success,
        })

    } catch (error) {
        dispatch({
            type:RESET_PASS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addOrder=(address,cart,phone,id)=>async(dispatch)=>{
    let itemsPrice=0,shippingPrice=100,totalPrice=0;
    for (let index = 0; index < cart.length; index++) {
        itemsPrice+=(cart[index].price)*(cart[index].quantity)
    }
    totalPrice=itemsPrice+shippingPrice;
    const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/new`,{
        sessioID:id,
        shippingInfo:{
            address:{
                localaddress:address.localaddress,
                pincode:address.pincode,
                city:address.city,
                state:address.state
            },
            phone:phone
        },
        orderItems:cart,
        itemsPrice,
        shippingPrice,
        totalPrice
    })
    dispatch({type:ADD_TO_CART});
}

export const loadUserOrders=()=> async (dispatch)=>{
    try {
        dispatch({
            type:LOAD_ORDERS_REQUEST
        });
        
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me/orders`);

        dispatch({
            type:LOAD_ORDERS_SUCCESS,
            payload:data.orders,
        })

    } catch (error) {
        dispatch({
            type:LOAD_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}

export const clearSuccess=()=>async(dispatch)=>{
    dispatch({type:CLEAR_SUCCESS});
}

export const clearMsg=()=>async(dispatch)=>{
    dispatch({type:CLEAR_MSG});
}

export const clearCartMsg=()=>async(dispatch)=>{
    dispatch({type:CLEAR_CART_MSG});
}