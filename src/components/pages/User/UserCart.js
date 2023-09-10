import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function UserCart({user, checkoutHandler}){
    let cost=0;
    return (
        <Fragment>
            <div className=''>
            {user.cart.map(obj=>{
                cost+=obj.quantity*obj.price;
                return <Link to={`/books/${obj.productID}`}>
                <div className='grid grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                    <img src={obj.image} alt="product" className='h-[150px] aspect-[3/4] rounded-md'/>
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
            {user.cart.length>0?(<Fragment><div className='flex flex-row justify-between border-t border-accent mb-4 pt-4 border-red-300'>
                <h1 className='font-["Montserrat"] text-lg font-medium inline self-center'>
                Total Cost of Cart: &#8377;{cost}
                </h1>
                <button onClick={checkoutHandler} className="font-medium font-['Montserrat'] border-2 border-yellow-400 hover:border-yellow-300 p-2 rounded-md h-fit self-center bg-yellow-400 hover:bg-yellow-300">Check Out</button>
            </div>
            <h1 className='font-["Roboto_Slab"] font-medium mt-7 mb-5 text-gray-500 text-center text-sm sm:text-base text-text2'>
                    <p className='inline text-text'>Disclaimer: </p>
                    This site has been developed for academic purposes, we do not sell books.
                    Only use the card number <i>4242 4242 4242 4242, where CVV is 123 with any future date as expiry</i> to test the payment integration. Do not use real payment methods.
            </h1>
            </Fragment>):(
                <div className='w-[90vw] sm:w-auto font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                    Your Cart is Empty!
                    <h1 className='text-base'><Link to='/explore' className='border-b inline w-fit border-blue-400'>Explore</Link> our collections to find what interest you . . .</h1>
                </div>
            )}
        </Fragment>
    )
}