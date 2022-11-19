import React, { Fragment, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, getProductDetails, reviewProduct } from "../../actions/productAction";
import {useSelector, useDispatch} from 'react-redux';
import Loader from "../elements/Loader";
import { addItemsToCart } from "../../actions/productAction";
import { toast } from "react-toastify";
import { clearCartMsg } from "../../actions/userAction";
import Notfound from '../elements/Notfound';
import Metadata from "../elements/Metadata";
import NavContext from "../elements/NavContext";
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
            return (str.substring(0, 180) + "...");
        }
        else if (window.innerWidth<450 && str.length > 250) {
            return (str.substring(0, 250) + "...");
        }
        else if (window.innerWidth<500 && str.length > 300) {
            return (str.substring(0, 300) + "...");
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
            toast('🐢 Boy! It\'s taking longer than usual. Please wait while we do something...', {
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
        <div id="explore" className="mx:4 sm:mx-9">
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
            
            <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-[#fa846f] w-1/3 pb-1 col-start-1 col-end-3">Book Details</h1>
            <div id='prddiv' className="grid grid-cols-[auto_2fr] justify-items-center sm:ml-10 mx-2 mt-2">
            {product.image && product.image.map(obj =>{
                return <img id="prdimg" alt="product" src={obj.url} className=" w-[30vw] sm:w-48 m-2 justify-self-end aspect-ratio-[0.69] self-center"></img>
            })
            }
                <div className="self-start justify-self-start mt-1 ml-1">
                    <h1 className="font-['Montserrat'] uppercase font-medium text-sm mt-1">{product.genre}</h1>
                    <h1 className="font-['Roboto_Slab'] text-xl sm:text-2xl mt-1">{product.title}</h1>
                    <p className="font-serif">{product.author}</p>
                    {product.description && <p className="font-serif">{ellipsify(product.description)}</p>}
                    <p className="font-mono">{product.ratings}&#9733; [{product.numOfReviews} reviews]</p>
                    <p className="font-sans font-medium">MRP: &#8377;{product.maxprice}</p>
                    <div className="hidden sm:block">
                        <p className="font-['Montserrat'] uppercase font-medium text-sm mt-2 mb-2">Available Sellers</p>
                        <div className="flex flex-row">
                        {product.sellers && product.sellers.map(obj =>{
                            
                            return <div className="mx-3 font-serif flex flex-col items-center justify-end max-w-[200px]">
                                <h1 className="tracking-wide text-center">{obj.sellerName}</h1>
                                <h1 className="font-sans font-medium">&#8377;{obj.sellingPrice}</h1>
                                <h1 className="">
                                    <button className="mr-2" onClick={(e)=>{decreaseQuantity(e)}}>-</button>
                                    <h1 className="inline text-lg">1</h1>
                                    <button className="ml-2" onClick={(e)=>{increaseQuantity(e,obj.quantity)}}>+</button>
                                </h1>
                                <button onClick={(e)=>{addToCartHandler(obj, e)}} className="border-2 border-[#f7735c] px-2 py-2 mt-2 hover:bg-red-50 active:bg-gray-200 active:border-gray-300">Add to Cart</button>
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
                                <button onClick={(e)=>{addToCartHandler(obj, e)}} className="border-2 border-[#f7735c] px-2 py-2 mt-2 hover:bg-red-50 active:bg-gray-200 active:border-gray-300">Add to Cart</button>
                            </div>
                        })}
                        </div>
                </div>

                <div className="col-start-1 col-end-3 grid w-full mt-4">
                    <p className="ml-3 font-['Montserrat'] uppercase font-medium text-sm mt-2 mb-2">
                        Reviews
                        {user._id && <button className="ml-1 text-lg" onClick={()=>{setAddReview(addReview=>addReview^1)}}>&#9997;</button>}
                    </p>
                    {addReview===1 && <div className="flex flex-row justify-center">
                        <form
                            onSubmit={addReviewHandler}
                            className="font-serif flex flex-col items-center border-2 p-2 w-fit mb-2"
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
                        className="block border-x border-y max-w-[280px] mb-2"
                        rows={4}
                        cols={50}
                        ></textarea>
                        <button type='submit' className="border p-1 border-[#f7735c]">Add Review</button>
                        </form>
                    </div>}
                    <div>
                        {product.reviews && product.reviews.map(review =>(
                                
                                <div className="flex flex-col justify-evenly border p-2 w-[90vw] sm:w-[80vw] mb-5 mr-1">
                                    <h2 className="font-['Montserrat'] font-medium flex flex-row justify-between">
                                        {review.name}: {review.rating}&#9733;
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