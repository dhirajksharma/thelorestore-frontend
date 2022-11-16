import {Fragment, React} from 'react';
import Metadata from "../elements/Metadata";

const Checkoutfail=()=>{
    return (
        <Fragment>
        <Metadata title="The Lore Store | Checkout Failure" nav={-1}/>
        <div className='mx-4 sm:mx-9 grid h-[90vh] items-center justify-items-center font-["Montserrat"] text-lg sm:text-xl text-center'>
        Your Payment has failed . . .
        </div>
        </Fragment>
    )
}

export default Checkoutfail;