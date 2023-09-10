import { Fragment } from "react"
import { Link } from "react-router-dom"

export default function SellerOrders({orders}){
    return (
        <Fragment>
            {orders.length>0?(
            <div className='sm:grid sm:grid-cols-2 md:grid-cols-3'>
            {orders.map(obj=>{                        
                return <Link to={`/orders/${obj._id}`}>
                    <div className='m-3 border-x border-y p-4 shadow-sm rounded-md max-w-[300px]'>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Order ID:</h1> {obj._id.substring(0,15)}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Location:</h1> {obj.shippingInfo.address.city+', '+obj.shippingInfo.address.state}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide'>Ordered Items:</h1> {obj.orderItems.length}</h1>
                    </div>
                </Link>
            })
            }</div>):(
                <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                    Your haven't recieved any orders yet . . .
                </div>
            )}
        </Fragment>
    )
}