import React, { Fragment, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, getProductDetails, reviewProduct } from "../../../actions/productAction";
import {useSelector, useDispatch} from 'react-redux';
import Loader from "../../elements/Loader";
import { addItemsToCart } from "../../../actions/productAction";
import { toast } from "react-toastify";
import { clearCartMsg } from "../../../actions/userAction";
import Notfound from '../../elements/Notfound';
import Metadata from "../../elements/Metadata";
import NavContext from "../../elements/NavContext";
const Productpage=()=>{
    const dispatch=useDispatch();
    const {id}=useParams();
    const {product, loading}=useSelector(state=>state.productDetails)
    const {user, cartSuccess}=useSelector(state=>state.user)
    const [review, setReview]=useState({
        rating:0,
        comment:""
    })
    
    const {serverError}=useContext(NavContext);
    const [addReview, setAddReview]=useState(0);
    const [overlay, setOverlay]=useState(0);

    useEffect(()=>{
        dispatch(getProductDetails(id));
        
        if(cartSuccess){
            toast.success("Item added to your cart", {
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
            dispatch(clearCartMsg());
        }
    },[dispatch, id, cartSuccess]);
    

    const decreaseQuantity=(e)=>{
        let qt=Number(e.target.nextElementSibling.innerHTML);
        if(qt>1){
            e.target.nextElementSibling.innerHTML=qt-1
        }
    }
    const increaseQuantity=(e,sellerQuantity)=>{
        let qt=Number(e.target.previousElementSibling.innerHTML);
        if(qt<sellerQuantity){
            e.target.previousElementSibling.innerHTML=qt+1
    }
    }

    const addToCartHandler=(seller, e)=>{
        if(user._id){
            dispatch(addItemsToCart(id,Number(e.target.previousElementSibling.childNodes[1].innerHTML),seller.sellerID, seller.sellerName, seller.sellingPrice))
            e.target.previousElementSibling.childNodes[1].innerHTML=1;
        }else{
            toast.error("Login to Add book to cart", {
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
        }
    }

    const addReviewHandler=(e)=>{
        e.preventDefault();
        dispatch(reviewProduct(id, review));
        setReview({
            rating:0,
            comment:""
        })
    }

    const deleteReviewHandler=(rev)=>{
        dispatch(deleteReview(id,rev._id));
    }

    function ellipsify (str) {
        if (window.innerWidth<400 && str.length > 180) {
            return (str.substring(0, 180)+" ");
        }
        else if (window.innerWidth<540 && str.length > 200) {
            return (str.substring(0, 200)+" ");
        }
        else if (window.innerWidth<640 && str.length > 400) {
            return (str.substring(0, 400)+" ");
        }
        else {
            return str;
        }
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
        <div id="explore" className="mx:4 sm:mx-9 text-text">
        <Metadata title="The Lore Store | Book Details" nav={1}/>
        {loading ?(
                <Fragment>
                    <Loader/>
                    {traffcheck()}
                </Fragment>
            ):(
            <div>
        {product?(
            <Fragment>
            
            <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">Book Details</h1>
            <div id='prddiv' className="grid grid-cols-[auto_2fr] justify-items-center sm:ml-10 mx-2 mt-2">
            {product.image && product.image.map(obj =>{
                return <img id="prdimg" alt="product" src={obj.url} className="w-[50vw] sm:w-48 sm:mr-4 sm:mt-9 sm:justify-self-end aspect-[3/4] self-start col-start-1 col-end-3 sm:col-end-2"></img>
            })
            }
                <div className="self-start justify-self-start mt-1 ml-1">
                    <h1 className="font-['Montserrat'] uppercase font-medium text-sm mt-1 text-slate-600">{product.genre}</h1>
                    <h1 className="font-['Roboto_Slab'] text-xl sm:text-2xl mt-1">{product.title}</h1>
                    <p className="font-serif text-text2">{product.author}</p>
                    {overlay?
                    <div id="infovrlay"
                        onClick={()=>{setOverlay(0)}}
                        className="fixed overflow-x-hidden z-20 top-0 left-0 right-0 bottom-0 grid items-center justify-center bg-white bg-opacity-30 backdrop-blur-[10px]"
                        >
                        <div className="bg-white z-10 w-[60vw] sm:w-[50vw] max-w-[450px] min-w-[300px] overflow-auto max-h-[80vh] rounded-md sm:rounded-none p-4 shadow-md shadow-[rgba(0,0,0,.5)]">
                            <h1 className="font-serif text-xl">{product.title}</h1>
                            <h2 className="font-['Montserrat'] text-sm font-medium text-text2">{product.author}</h2>
                            <h2 className="font-['Montserrat'] text-sm font-medium text-text2">{product.isbn}</h2>
                            <h2 className="mb-3 font-['Montserrat'] text-sm font-medium text-text2">{product.publisher}</h2>
                            <p className="border-t pt-2 border-accent font-serif">{product.description}</p>
                        </div>
                    </div>:null}
                    {product.description && <p className="font-serif">
                        {ellipsify(product.description)}
                        {window.innerWidth<640?
                            <button id="infovrlaybtn"
                            onClick={()=>{setOverlay(1)}}
                            className="font-medium italic border-b border-accent"
                            >...more</button>:null}
                        </p>}
                    <p className="font-mono">{product.ratings}&#11088; [{product.numOfReviews} reviews]</p>
                    <p className="font-sans font-medium">MRP: &#8377;{product.maxprice}</p>
                    <div className="hidden sm:block">
                        <p className="font-['Montserrat'] uppercase font-medium text-sm mt-3 mb-2 text-text2">Available Sellers</p>
                        <div className="flex flex-wrap">
                        {product.sellers && product.sellers.map(obj =>{
                            
                            return <div className="mx-3 font-serif flex flex-col items-center justify-end max-w-[200px]">
                                <h1 className="tracking-wide text-center">{obj.sellerName}</h1>
                                <h1 className="font-sans font-medium">&#8377;{obj.sellingPrice}</h1>
                                <h1 className="">
                                    <button className="mr-2" onClick={(e)=>{decreaseQuantity(e)}}>-</button>
                                    <h1 className="inline text-lg">1</h1>
                                    <button className="ml-2" onClick={(e)=>{increaseQuantity(e,obj.quantity)}}>+</button>
                                </h1>
                                <button onClick={(e)=>{addToCartHandler(obj, e)}} className="border-2 border-yellow-400 bg-yellow-400 px-2 py-1 mt-2 hover:bg-yellow-300 hover:border-yellow-300 rounded-md">Add to Cart</button>
                            </div>
                        })}
                        </div>
                    </div>
                </div>
                
                <div className="sm:hidden col-start-1 col-end-3">
                        <p className="font-['Montserrat'] uppercase font-medium text-sm mt-2 mb-2">Available Sellers</p>
                        <div className="grid grid-cols-2 w-[90vw]">
                        {product.sellers && product.sellers.map(obj =>{
                            
                            return <div className="mx-3 my-1 font-serif flex flex-col items-center justify-end max-w-[200px]">
                                <h1 className="tracking-wide text-center">{obj.sellerName}</h1>
                                <h1 className="font-sans font-medium">&#8377;{obj.sellingPrice}</h1>
                                <h1 className="">
                                    <button className="mr-2" onClick={(e)=>{decreaseQuantity(e)}}>-</button>
                                    <h1 className="inline text-lg">1</h1>
                                    <button className="ml-2" onClick={(e)=>{increaseQuantity(e,obj.quantity)}}>+</button>
                                </h1>
                                <button onClick={(e)=>{addToCartHandler(obj, e)}} className="border-2 border-yellow-400 bg-yellow-400 px-2 py-1 mt-2 hover:bg-yellow-300 hover:border-yellow-300 rounded-md">Add to Cart</button>
                            </div>
                        })}
                        </div>
                </div>

                <div className="col-start-1 col-end-3 grid w-full mt-4">
                    <p className="ml-3 font-['Montserrat'] uppercase font-medium text-sm mt-2 mb-2">
                        Reviews
                        {user._id && <button className="ml-1 text-lg" onClick={()=>{setAddReview(addReview=>addReview^1)}}>&#9997;</button>}
                    </p>
                    {addReview?
                    <div id="infovrlay"
                        onClick={()=>{setAddReview(addReview=>addReview^1)}}
                        className="fixed overflow-auto z-20 top-0 left-0 right-0 bottom-0 grid items-center justify-center bg-white bg-opacity-30 backdrop-blur-[10px]"
                        >
                        <form
                            onSubmit={addReviewHandler}
                            className="font-serif flex flex-col items-center p-5 rounded-md w-fit mb-2 bg-white shadow-md shadow-[rgba(0,0,0,.5)]"
                            onClick={(e)=>{e.stopPropagation()}}
                        >
                        <label>Rating:
                        <select
                            className='inline ml-1'
                            value={review.rating}
                            onChange={(e)=>setReview(review=>({...review, rating: e.target.value}))}
                            >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </label>
                        <textarea
                        placeholder="Comment"
                        value={review.comment}
                        onChange={(e)=>setReview(review=>({...review, comment: e.target.value}))}
                        className="block border-x border-y border-accent max-w-[280px] sm:max-w-none mb-4"
                        rows={10}
                        cols={50}
                        ></textarea>
                        <button type='submit' className="p-2 bg-yellow-400 hover:bg-yellow-300 rounded-md">Add Review</button>
                        </form>
                    </div>:null}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {product.reviews && product.reviews.map(review =>(
                            <div className="border shadow-md rounded-md p-2 mb-5 mx-4">
                                <h2 className="font-['Montserrat'] font-medium flex flex-row justify-between">
                                    {review.name}: &#11088; {review.rating}
                                    {user && (user._id===review.userId || user.role==="seller") && <button
                                    className="text-xl"
                                    onClick={()=>{deleteReviewHandler(review)}}>
                                    &#10062;</button>}
                                </h2>
                                <h2 className="font-['Roboto_Slab'] text-sm mt-1">{review.comment}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </Fragment>
        ):(
            <Notfound/>
        )}</div>)
        }
        </div>
    )
}

export default Productpage;