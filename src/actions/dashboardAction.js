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
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getSellerProducts=()=>async(dispatch)=>{
    try{
        
        dispatch({
            type:MY_PRODUCTS_REQUEST
        })

        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me/books`);
        dispatch({
            type:MY_PRODUCTS_SUCCESS,
            payload:data.products,
        })
    }catch(error){
        dispatch(
            {
                type:MY_PRODUCTS_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const getSellerOrders=()=>async(dispatch)=>{
    try{
        dispatch({
            type:MY_ORDERS_REQUEST
        })

        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/my`);
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.sellerorders,
        })
    }catch(error){
        dispatch(
            {
                type:MY_ORDERS_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const addProduct=(details)=> async (dispatch)=>{
    try {
        dispatch({
            type:ADD_PRODUCT_REQUEST
        });
        
        const {data}=await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/books/new`,
            {
                title:details.title,
                maxprice:details.maxprice,
                description:details.description,
                author:details.author,
                genre:details.genre,
                publisher:details.publisher,
                year:details.year,
                isbn:details.isbn,
                image:[
                    {
                        public_id:"temp id",
                        url:details.image
                    }
                ],
                currentSeller:{
                    sellingPrice:details.currentSeller.sellingPrice,
                    quantity:details.currentSeller.quantity
                }
            }
        );

        dispatch({
            type:ADD_PRODUCT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type:ADD_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateProductDetails=(details)=>async(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        })
        console.log(details);
        const data=await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/books/update`, details);
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
        })
    }catch(error){
        dispatch(
            {
                type:UPDATE_PRODUCT_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}


export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}

export const clearPrdSuccess=()=>async(dispatch)=>{
    dispatch({type:CLEAR_PRODUCT_SUCCESS});
}