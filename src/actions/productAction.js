import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    ADD_TO_CART,
    REVIEW_PRODUCT,
    DELETE_REVIEW_PRODUCT} from '../constants/productConstants'
import axios from 'axios';
axios.defaults.withCredentials = true;
    
export const getProduct=(keyword="", currentPage=1, price=[0,10000], ratings=0, sort={maxprice:0,year:0,ratings:0}, genre)=>async(dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })
        let link=`${process.env.REACT_APP_BACKEND_URL}/api/v1/books?keyword=${keyword}&page=${currentPage}&maxprice[gte]=${price[0]}&maxprice[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(genre){
            link=`${process.env.REACT_APP_BACKEND_URL}/api/v1/books?keyword=${keyword}&page=${currentPage}&maxprice[gte]=${price[0]}&maxprice[lte]=${price[1]}&genre=${genre}&ratings[gte]=${ratings}`;
        }
        
        if(sort.maxprice!==0){
            link=link+`&sort[maxprice]=${sort.maxprice}`;
        }
        if(sort.year!==0){
            link=link+`&sort[year]=${sort.year}`;
        }
        if(sort.ratings!==0){
            link=link+`&sort[ratings]=${sort.ratings}`;
        }

        const data=await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch(
            {
                type:ALL_PRODUCT_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })

        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/books/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch(
            {
                type:PRODUCT_DETAILS_FAIL,
                payload:error.response.data.message,
            }
        )
    }
}

export const addItemsToCart=(id, quantity, sellerID, sellerName, sellingPrice)=>async (dispatch)=>{
    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/books/${id}`);
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me/cart`,
    {
        productID:data.product._id,
        name:data.product.title,
        price:sellingPrice,
        image:data.product.image[0].url,
        sellerID:sellerID,
        sellerName:sellerName,
        quantity:quantity
    })

    dispatch({
        type:ADD_TO_CART,
    });
};

export const reviewProduct=(id,review)=>async(dispatch)=>{
    const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/books/${id}`,review);
    window.location.reload();
    dispatch({
        type:REVIEW_PRODUCT,
    });
}

export const deleteReview=(id, revid)=>async(dispatch)=>{
    
    try{
    const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/deletereview/${id}/${revid}`)
    window.location.reload();
    dispatch({
        type:DELETE_REVIEW_PRODUCT,
    });}catch(error){
        console.log(error.response.data);
    }
}
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}