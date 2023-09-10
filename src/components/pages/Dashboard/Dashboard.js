import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearErrors, clearPrdSuccess, getSellerProducts, updateProductDetails} from '../../../actions/dashboardAction';
import Loader from '../../elements/Loader';
import TinyDropdown from '../../elements/TinyDropdown';
import {toast} from 'react-toastify';
import Notfound from '../../elements/Notfound';
import './Dashboard.css';
import Metadata from "../../elements/Metadata";
import NavContext from '../../elements/NavContext';
import SellerStats from './SellerStats';
import SellerOrders from './SellerOrders';
import SellerUpdateProduct from './SellerUpdateProduct';
import SellerNewProduct from './SellerNewProduct';
import SellerProducts from './SellerProducts';
import { useNavigate } from 'react-router-dom';

const Dashboard=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {products, orders, loading, error, productSuccess, productsLoading, ordersLoading}=useSelector(state=> state.dashboard)
    const {user}=useSelector(state=>state.user);
    const {serverError}=useContext(NavContext);
    const [option, setOption]=useState('My Products')
    const [optionSelected,setOptionSelected]=useState(0);
    const [newBookDetails, setNewBookDetails]=useState(
        {
            title:"",
            maxprice:"",
            description:"",
            author:"",
            genre:"",
            publisher:"",
            year:"",
            isbn:"",
            image:"",
            currentSeller:{
                sellingPrice:"",
                quantity:""
            }
        });
    const [updateBookDetails, setUpdateBookDetails]=useState({
        isbn:"",
        currentSeller:{},
        genre:"",
    })
    useEffect(()=>{
        
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
        if(productSuccess){
            toast.success("Update Successful", {
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
            setNewBookDetails({
                title:"",
                maxprice:"",
                description:"",
                author:"",
                genre:"",
                publisher:"",
                year:"",
                isbn:"",
                image:"",
                currentSeller:{
                    sellingPrice:"",
                    quantity:""
                }
            })
            setUpdateBookDetails({
                isbn:"",
                currentSeller:{},
                genre:"",
            })

            dispatch(clearPrdSuccess());
            dispatch(getSellerProducts());
            
        }
    },[error, productSuccess, dispatch])


    const handleToggle=(e)=>{
        setOption(option=>e.target.innerHTML)
    }

    const DashboardTabHandler=(option, index)=>{
        setOption(option)
        setOptionSelected(index)
    }
    
    const AddBookHandler=(e)=>{
        e.preventDefault();
        dispatch(addProduct(newBookDetails));
    }

    const UpdateBookHandler=(e)=>{
        e.preventDefault();
        if(updateBookDetails.genre===""){
            delete updateBookDetails.genre
        }
        dispatch(updateProductDetails(updateBookDetails));
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
        <div className=''>
        <Metadata title="The Lore Store | Seller Dashboard"  nav={3}/>
        {loading===true || productsLoading===true || ordersLoading===true?(
                <Fragment>
                    <Loader/>
                    {traffcheck()}
                </Fragment>
            ):(<div>
                {user.role==="seller"?(
            <Fragment>
            <div className="mx-4 sm:mx-9 grid sm:grid-cols-[1fr_2fr] grid-rows-[min-content_auto_min-content] gap-2 h-[90vh]">

            <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">Seller Dashboard</h1>

            <div id='tinydash' className='sm:hidden'>
                <TinyDropdown
                    options={['My Products', 'Add New Product', 'Update a Product', 'Orders', 'Statistics']}
                    onSelect={(option, selectedIndex) => DashboardTabHandler(option, selectedIndex)}
                    placeHolder='My Products'
                    selectedIndex={optionSelected}
                    cssOverrides={{
                        dropdownButton: {
                            fontSize:'medium'
                        },
                        dropdownPanel: {
                            marginRight:"4px"
                        },
                        dropdownOption: {
                            fontFamily: 'serif',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'medium',
                        },
                        dropdownOptionSelected: {
                            fontFamily: 'serif',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'medium'
                        }
                      }}
                />
            </div>


            <div className="hidden sm:flex flex-col items-start font-['Montserrat'] font-medium ml-1">        
                <button onClick={handleToggle} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>My Products</button>
                <button onClick={handleToggle} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>Add New Product</button>
                <button onClick={handleToggle} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>Update a Product</button>
                <button onClick={handleToggle} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>Orders</button>
                <button onClick={handleToggle} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>Statistics</button>
                <button onClick={()=>navigate('/me')} className='hover:bg-gray-100 block font-serif text-left font-light mb-1 px-2 py-1 rounded-md max-w-[250px] w-full'>Back to Profile</button>
            </div>
    
            <div className="sm:w-[75vw]">
                {option==='My Products' && products && <SellerProducts products={products} /> }

                {option==='Add New Product' && <SellerNewProduct AddBookHandler={AddBookHandler} newBookDetails={newBookDetails} setNewBookDetails={setNewBookDetails} /> }

                {option==='Update a Product' && <SellerUpdateProduct UpdateBookHandler={UpdateBookHandler} updateBookDetails={updateBookDetails} setUpdateBookDetails={setUpdateBookDetails} /> }

                {option==='Orders' && orders && <SellerOrders orders={orders} /> }

                {option==='Statistics' && <SellerStats/> }
            </div>
            </div>
            </Fragment>
            ):(
                <Notfound/>
            )}</div>)}
        </div>
        
    )
}

export default Dashboard;