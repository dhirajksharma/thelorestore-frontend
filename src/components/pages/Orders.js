import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { clearDelMsg, clearErrors, deleteOrderDetails, getOrderDetails } from '../../actions/orderAction';
import {toast} from 'react-toastify'
import Notfound from '../elements/Notfound';
import Loader from '../elements/Loader';

const Order=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const {loading, order, error, orderDeleted}=useSelector(state=>state.orderDetails)
    const {user}=useSelector(state=>state.user)
    const [firstFetch, setFirstFetch]=useState(0);
    
    useEffect(()=>{
        if(firstFetch===0){
            console.log("he");
            dispatch(getOrderDetails(id));
            setFirstFetch(1);
        }
        
        if(orderDeleted){
            toast.success("Order Deleted Successfully")
            dispatch(clearDelMsg());
            navigate('/me');
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, error, loading])
    
    const deleteOrderHandler=()=>{
        dispatch(deleteOrderDetails(id));
    }

    return(
        <div className='mx-4 sm:mx-9'>
            {loading?(<Loader/>):(
            <div>
            {order && order._id?
            <div className='h-[90vh]'>
                <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 w-1/3 pb-1 col-start-1 col-end-3">Order Details</h1>                
                <h1 className='font-["Montserrat"] font-medium tracking-wide border-b mb-1'>Order Summary</h1>
                <div className='ml-4'>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Order ID: </h1> {order._id}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Order Date:</h1> {order.orderDate}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Order Cost:</h1> &#8377;{order.itemsPrice}</h1>                    
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Shipping Cost:</h1> &#8377;{order.shippingPrice}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Total Cost:</h1> &#8377;{order.totalPrice}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Order Status:</h1> {order.orderStatus}</h1>
                </div>
                <h1 className='font-["Montserrat"] font-medium mt-2 tracking-wide border-b mb-1'>Ordered By</h1>
                        <h1 className="font-serif"><h1 className='ml-4 font-["Montserrat"] font-medium inline text-sm tracking-wide'>Name:</h1> {order.user.name}</h1>
                        <h1 className="font-serif"><h1 className='ml-4 font-["Montserrat"] font-medium inline text-sm tracking-wide'>Email ID:</h1> {order.user.email}</h1>


                <h1 className='mt-4 font-["Montserrat"] font-medium tracking-wide border-b mb-1'>Shipping Details</h1>
                <div className='ml-4'>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Phone Number:</h1> {order.shippingInfo.phone}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Local Address:</h1> {order.shippingInfo.address.localaddress}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>Pincode:</h1> {order.shippingInfo.address.pincode}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>City:</h1> {order.shippingInfo.address.city}</h1>
                <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1'>State:</h1> {order.shippingInfo.address.state}</h1>
                </div>

                <div className='mt-4'>
                    <h1 className='mt-4 font-["Montserrat"] font-medium tracking-wide border-b mb-1'>Order Items</h1>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 ml-4'>
                    {order.orderItems.map(obj=>{
                        return <Link to={`/books/${obj.productID}`}>
                        <div className='grid grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                            <img src={obj.image} className='h-[150px] aspect-ratio-[0.69]'/>
                            <div className='font-serif ml-3'>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Book:</h1> {obj.name}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Seller:</h1> {obj.sellerName}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Selling Price:</h1> &#8377;{obj.price}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Quantity:</h1> {obj.quantity}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Total Price:</h1> &#8377;{obj.quantity * obj.price}</h1>
                            </div>
                        </div>
                        </Link>
                        })
                    
                    }</div>
                </div>
                {user._id===order.user._id && <button
                className='border-[3px] border-red-600 p-1 mb-6 mt-6 rounded-md font-["Montserrat"] font-medium'
                onClick={deleteOrderHandler}
                >Delete Order</button>}
            <div>
                </div>
            </div>:<Notfound/>
            }</div>)}
        </div>
    )
}

export default Order;