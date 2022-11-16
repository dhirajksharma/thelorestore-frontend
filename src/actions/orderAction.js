import {CLEAR_DELETE_MSG,
        CLEAR_ERRORS,
        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_FOUND,
        ORDER_DETAILS_REQUEST,
        ORDER_DELETE_FAIL,
        ORDER_DELETE_REQUEST,
        ORDER_DELETE_SUCCESS
    } 
    from '../constants/orderConstants'
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${id}`);
        
        dispatch({
            type:ORDER_DETAILS_FOUND,
            payload:data.order,
        })
    }catch(error){
        dispatch(
            {
                type:ORDER_DETAILS_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const deleteOrderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:ORDER_DELETE_REQUEST
        })

        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${id}`);
        
        dispatch({
            type:ORDER_DELETE_SUCCESS,
        })
    }catch(error){
        dispatch(
            {
                type:ORDER_DELETE_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}

export const clearDelMsg=()=>async(dispatch)=>{
    dispatch({type:CLEAR_DELETE_MSG});
}