import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { addProduct, clearErrors, clearPrdSuccess, getSellerProducts, updateProductDetails} from '../../actions/dashboardAction';
import Loader from '../elements/Loader';
import TinyDropdown from '../elements/TinyDropdown';
import {toast} from 'react-toastify';
import Notfound from '../elements/Notfound';
import './Dashboard.css';
import Metadata from "../elements/Metadata";
import NavContext from '../elements/NavContext';

const Dashboard=()=>{

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

    const generateOptions=()=>
    {
        
        return ['Arts and Entertainment','Biographies and Memoirs','Business and Investing','Comics','Computer and Technology','Cookery, Food and Wine','Fiction and Literature','Health, Mind and Body','Religion and Spirituality'].map( genre => (
            <option value={genre}>{genre}</option>
        ));
    }
    
    const loadRef=useRef(loading);
    loadRef.current=loading;
    const serverRef=useRef(serverError);
    serverRef.current=serverError;

    const traffcheck=()=>{
        setTimeout(()=>{
            if(loadRef.current===true && serverRef.current!==1)
            toast('Boy! It\'s taking longer than usual. Bangalore traffic I guess 😅😅', {
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

            <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-[#fa846f] w-1/3 pb-1 col-start-1 col-end-3">Seller Dashboard</h1>

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
                <button onClick={handleToggle} className='mb-1'>My Products</button>
                <button onClick={handleToggle} className='mb-1'>Add New Product</button>
                <button onClick={handleToggle} className='mb-1'>Update a Product</button>
                <button onClick={handleToggle} className='mb-1'>Orders</button>
                <button onClick={handleToggle} className='mb-1'>Statistics</button>
            </div>
    
            <div className="sm:w-[75vw]">
                {option==='My Products' && (<Fragment>
                    {products.length>0?(<div>
                    {products.map(obj=>{
                        return <Link to={`/books/${obj._id}`}>
                        <div className='grid grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                            <img src={obj.image[0].url} alt="product" className='h-[150px] aspect-ratio-[0.69]'/>
                            <div className='font-serif ml-3'>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Book:</h1> {obj.title}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>ISBN:</h1> {obj.isbn}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Quantity:</h1> {obj.sellers[0].quantity}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>MRP:</h1> &#8377;{obj.maxprice}</h1>
                                <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Selling Price:</h1> &#8377;{obj.sellers[0].sellingPrice}</h1>
                            </div>
                        </div>
                        </Link>})
                    }</div>):(
                        <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                            Your haven't added any books to sell, add them to see here
                        </div>
                    )}
                </Fragment>)}

                {option==='Add New Product' && (<Fragment>
                    <form onSubmit={AddBookHandler}>
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 -ml-1">Book Info</h3>
                        <select
                            required
                            className="-ml-1 block font-['Montserrat'] font-medium text-gray-600 uppercase text-sm mb-2"
                            value={newBookDetails.genre}
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, genre: e.target.value}))}>
                            <option value="">SELECT A GENRE</option>
                            {generateOptions()}
                        </select>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Title</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Title"
                            value={newBookDetails.title}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, title: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Author</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Author"
                            value={newBookDetails.author}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, author: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Description</h3>
                        <textarea
                        required
                        placeholder="Write a description for the book..."
                        value={newBookDetails.description}
                        onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, description: e.target.value}))}
                        className="block font-serif border-x border-y min-w-[250px] w-[30vw]"
                        rows={4}
                        ></textarea>
                        
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Publishing Info</h3>
                    
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">ISBN Number</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book ISBN"
                            value={newBookDetails.isbn}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, isbn: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publisher Name</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Publisher"
                            value={newBookDetails.publisher}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, publisher: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publishing Year</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Publishing Year"
                            value={newBookDetails.year}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, year: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Maximum Retail Price</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book MRP"
                            value={newBookDetails.maxprice}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, maxprice: e.target.value}))}
                        />
                            
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Seller Info</h3>
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Quantity</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Quantity"
                            value={newBookDetails.currentSeller.quantity}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, currentSeller:{...newBookDetails.currentSeller,quantity: e.target.value}}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Your Selling Price</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Selling Price"
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            value={newBookDetails.currentSeller.sellingPrice}
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, currentSeller:{...newBookDetails.currentSeller,sellingPrice: e.target.value}}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Cover Image Link</h3>
                        <input
                            required
                            type="text"
                            placeholder="Book Cover Image Link"
                            value={newBookDetails.image}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, image: e.target.value}))}
                        />
                        <button type='submit' className='border-2 py-1 px-2 border-[#f7735c] block mt-4 mb-5 font-["Montserrat"] font-medium hover:bg-gray-100 active:bg-gray-200 active:border-gray-300'>Add Book</button>
                    </form>
                </Fragment>)}

                {option==='Update a Product' && (<Fragment>
                    <form onSubmit={UpdateBookHandler}>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase -ml-1">Enter ISBN Number to Update Book</h3>
                        <input
                            type="text"
                            placeholder="ISBN Number"
                            value={updateBookDetails.isbn}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b -ml-1"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, isbn: e.target.value}))}
                        />
                        <h1 className="font-['Montserrat'] -ml-1 mt-2 text-sm"><b>*Only fill in the fields that you want to update</b></h1>
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 -ml-1">Book Info</h3>
                        <select
                            className="-ml-1 block font-['Montserrat'] font-medium text-gray-600 uppercase text-sm mb-2"
                            value={updateBookDetails.genre}
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, genre: e.target.value}))}>
                            {generateOptions()}
                            <option value="">SELECT A GENRE</option>
                        </select>
                    <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Title</h3>
                        <input
                            type="text"
                            placeholder="Book Title"
                            value={updateBookDetails.title}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, title: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Author</h3>
                        <input
                            type="text"
                            placeholder="Book Author"
                            value={updateBookDetails.author}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, author: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Description</h3>
                        <textarea
                        placeholder="Write a description for the book..."
                        value={updateBookDetails.description}
                        onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, description: e.target.value}))}
                        className="block font-serif border-x border-y min-w-[250px] w-[30vw]"
                        rows={4}
                        ></textarea>

                        
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Publishing Info</h3>
                    
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publisher Name</h3>
                        <input
                            type="text"
                            placeholder="Book Publisher"
                            value={updateBookDetails.publisher}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, publisher: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publishing Year</h3>
                        <input
                            type="text"
                            placeholder="Book Publishing Year"
                            value={updateBookDetails.year}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, year: e.target.value}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Maximum Retail Price</h3>
                        <input
                            type="text"
                            placeholder="Book MRP"
                            value={updateBookDetails.maxprice}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, maxprice: e.target.value}))}
                        />
                            
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Seller Info</h3>
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Quantity</h3>
                        <input
                            type="text"
                            placeholder="Book Quantity"
                            value={updateBookDetails.currentSeller.quantity}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, currentSeller:{...newBookDetails.currentSeller,quantity: e.target.value}}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Your Selling Price</h3>
                        <input
                            type="text"
                            placeholder="Book Selling Price"
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            value={updateBookDetails.currentSeller.sellingPrice}
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, currentSeller:{...newBookDetails.currentSeller,sellingPrice: e.target.value}}))}
                        />
                        <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Cover Image Link</h3>
                        <input
                            type="text"
                            placeholder="Book Cover Image Link"
                            value={updateBookDetails.image}
                            className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                            onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, image: e.target.value}))}
                        />
                        <button type='submit' className='border-2 p-1 border-[#f7735c] block mt-4 mb-5 font-["Montserrat"] font-medium hover:bg-gray-100 active:bg-gray-200 active:border-gray-300'>Update Book</button>
                    </form>
                </Fragment>)}

                {option==='Orders' && (<Fragment>
                    {orders.length>0?(<div>
                    {orders.map(obj=>{
                        return <Link to={`/orders/${obj._id}`}><div className='mb-3 border-x border-y p-2'>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Order ID:</h1> {obj._id}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Ordered Items:</h1> {obj.orderItems.length}</h1>
                        </div></Link>
                    })
                    }</div>):(
                        <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                            Your haven't recieved any orders yet . . .
                        </div>
                    )}
                </Fragment>)}

                {option==='Statistics' && (<Fragment>
                    <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                            Your sales stats will show up here soon . . .
                        </div>
                </Fragment>)}
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