import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearDelMsg, clearErrors, deleteOrderDetails, getOrderDetails } from '../../../actions/orderAction';
import {toast} from 'react-toastify'
import Notfound from '../../elements/Notfound';
import Loader from '../../elements/Loader';
import Metadata from "../../elements/Metadata";
import NavContext from '../../elements/NavContext';

const Order=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const {loading, order, error, orderDeleted}=useSelector(state=>state.orderDetails)
    const {user}=useSelector(state=>state.user)
    const [firstFetch, setFirstFetch]=useState(0);
    const {serverError}=useContext(NavContext);

    useEffect(()=>{
        if(firstFetch===0){
            dispatch(getOrderDetails(id));
            setFirstFetch(1);
        }
        
        if(orderDeleted){
            toast.success("Order Deleted Successfully", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                toastId:"success"
                });
            dispatch(clearDelMsg());
            navigate('/me');
        }
        if(error){
            toast.error(error, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                toastId:"error"
                });
            dispatch(clearErrors());
        }
    },[dispatch, error, loading])
    
    const deleteOrderHandler=()=>{
        dispatch(deleteOrderDetails(id));
    }

    const loadRef=useRef(loading);
    loadRef.current=loading;
    const serverRef=useRef(serverError);
    serverRef.current=serverError;

    const traffcheck=()=>{
        setTimeout(()=>{
            if(loadRef.current===true && serverRef.current!==1)
            toast('🐢 The first request takes upto 30s, please wait while the server is spun up...', {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId:"traffcheck"
                });
        },8000)
        
    }
    return(
        <div className='mx-4 sm:mx-9 text-text'>
            <Metadata title="The Lore Store | Order Details" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
            <div>
            {order && order._id?
            <div className='h-[90vh]'>
                <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">Order Details</h1>
                <div className='sm:flex'>
                    <div className='sm:w-[50%] md:w-[40%]'>
                        <h1 className='font-["Montserrat"] font-medium tracking-wide border-b mb-1 mt-3 sm:w-[25vw] text-text2 border-accent'>Order Summary</h1>
                        <div className='ml-4'>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Order ID: </h1> {order._id}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Order Date:</h1> {order.orderDate}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Order Cost:</h1> &#8377;{order.itemsPrice}</h1>                    
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Shipping Cost:</h1> &#8377;{order.shippingPrice}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Total Cost:</h1> &#8377;{order.totalPrice}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Order Status:</h1> {order.orderStatus}</h1>
                        </div>
                        <h1 className='font-["Montserrat"] font-medium mt-2 tracking-wide border-b mb-1 sm:w-[25vw] text-text2 border-accent'>Ordered By</h1>
                                <h1 className="font-serif"><h1 className='ml-4 font-["Montserrat"] font-medium inline text-sm tracking-wide text-text2'>Name:</h1> {order.user.name}</h1>
                                <h1 className="font-serif"><h1 className='ml-4 font-["Montserrat"] font-medium inline text-sm tracking-wide text-text2'>Email ID:</h1> {order.user.email}</h1>


                        <h1 className='mt-4 font-["Montserrat"] font-medium tracking-wide border-b mb-1 sm:w-[25vw] text-text2 border-accent'>Shipping Details</h1>
                        <div className='ml-4'>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Phone Number:</h1> {order.shippingInfo.phone}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Local Address:</h1> {order.shippingInfo.address.localaddress}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>Pincode:</h1> {order.shippingInfo.address.pincode}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>City:</h1> {order.shippingInfo.address.city}</h1>
                        <h1 className="font-serif"><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide mr-1 text-text2'>State:</h1> {order.shippingInfo.address.state}</h1>
                        </div>
                    </div>
                    <div className='mt-4 sm:mt-0 sm:w-[50%] md:w-[60%]'>
                        <h1 className='mt-3 font-["Montserrat"] font-medium tracking-wide border-b mb-3 sm:w-[25vw] '>Order Items</h1>
                        <div className='flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 ml-4'>
                        {order.orderItems.map(obj=>{
                            return <Link to={`/books/${obj.productID}`}>
                            <div className='grid md:block grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                                <img src={obj.image} alt="product" className='h-[150px] aspect-[3/4]'/>
                                <div className='font-serif pt-2 ml-2 md:ml-0'>
                                    <h1>{obj.name.substring(0,30)}</h1>
                                    <h1 className='-mt-1'><h1 className=' font-["Montserrat"] font-medium inline text-sm tracking-wide'>Selling Price:</h1> &#8377;{obj.price}</h1>
                                    <h1 className='-mt-1'><h1 className=' font-["Montserrat"] font-medium inline text-sm tracking-wide'>Quantity:</h1> {obj.quantity}</h1>
                                    <h1 className='-mt-1'><h1 className=' font-["Montserrat"] font-medium inline text-sm tracking-wide'>Total Price:</h1> &#8377;{obj.quantity * obj.price}</h1>
                                </div>
                            </div>
                            </Link>
                            })
                        
                        }</div>
                    </div>
                </div>
                {order.orderStatus==="Not Delivered" && <button
                className='border-[3px] border-red-700 bg-red-700 rounded-md py-1 px-2 mb-6 mt-6 font-["Montserrat"] font-medium text-white hover:bg-red-500 hover:border-red-500'
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