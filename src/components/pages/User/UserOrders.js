import { Fragment } from "react"
import { Link } from "react-router-dom"

export default function UserOrders({orders}){
    return (
        <Fragment>
            {orders.length>0?(
            <div className='sm:grid sm:grid-cols-2 md:grid-cols-3'>
            {orders.map(obj=>{                        
                return <Link to={`/orders/${obj._id}`}>
                    <div className='m-3 border-x border-y p-4 shadow-sm rounded-md max-w-[300px]'>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide text-text2'>Order ID:</h1> {obj._id.substring(0,15)}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide text-text2'>Order Date:</h1> {obj.orderDate.substring(0,10)}</h1>
                        <h1><h1 className='font-["Montserrat"] font-medium inline text-sm tracking-wide text-text2'>Order Total:</h1> &#8377;{obj.totalPrice}</h1>
                    </div>
                </Link>
            })
            }</div>):(
                <div className='font-["Montserrat"] text-lg font-medium pt-4 grid h-full content-center justify-center text-center'>
                    Your haven't ordered anything yet :'(
                </div>
            )
            }
        </Fragment>
    )
}