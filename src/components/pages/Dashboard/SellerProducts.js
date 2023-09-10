import { Fragment } from "react"
import { Link } from "react-router-dom"

export default function SellerProducts({products}){
    return (
        <Fragment>
            {products.length>0?(
            <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
            {products.map(obj=>{
                return <Link to={`/books/${obj._id}`}>
                <div className='grid sm:block grid-cols-[auto_1fr] grid-rows-1 items-center justify-items-start mb-4'>
                    <img src={obj.image[0].url} alt="product" className='h-[150px] aspect-[3/4] rounded-md'/>
                    <div className='font-serif pt-2 ml-2 sm:ml-0'>
                        <h1 className='-mt-1'><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Book:</h1> {obj.title.substring(0,30)}</h1>
                        <h1 className='-mt-1'><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>ISBN:</h1> {obj.isbn}</h1>
                        <h1 className='-mt-1'><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Quantity:</h1> {obj.sellers[0].quantity}</h1>
                        <h1 className='-mt-1'><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>MRP:</h1> &#8377;{obj.maxprice}</h1>
                        <h1 className='-mt-1'><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>SP:</h1> &#8377;{obj.sellers[0].sellingPrice}</h1>
                    </div>
                </div>
                </Link>})
            }</div>):(
                <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                    Your haven't added any books to sell, add them to see here
                </div>
            )}
            </Fragment>
    )
}