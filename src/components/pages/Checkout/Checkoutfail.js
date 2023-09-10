import {Fragment, React, useEffect} from 'react';
import Metadata from "../../elements/Metadata";
import sadimg from '../../../res/3047124.jpg'
import { useNavigate } from 'react-router-dom';

const Checkoutfail=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        let id=sessionStorage.getItem('checkoutSessionID')
        console.log(id)
        if(id==='' || id===null)
            navigate('/error')
    },[navigate])
    
    return (
        <Fragment>
        <Metadata title="The Lore Store | Checkout Failure" nav={-1}/>
        <div className='mx-4 sm:mx-9 h-[90vh] flex flex-col items-center justify-center font-["Montserrat"] sm:text-xl text-center'>
            <img src={sadimg} className={window.innerHeight>window.innerWidth?'w-full ':'h-3/4 object-contain'}></img>
            Your Payment has failed. Please try again.
        </div>
        </Fragment>
    )
}

export default Checkoutfail;