import {Fragment, React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../actions/userAction';
import Metadata from "../../elements/Metadata";

const Checkoutsuccess=()=>{
    
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)

    useEffect(()=>{
        if(user && user.cart && user.cart.length)
            dispatch(addOrder(user.address, user.cart, user.phone))
    },[dispatch, user])

    return (
        <Fragment>
    <Metadata title="The Lore Store | Checkout Success"  nav={-1}/>
    <div className='mx-4 sm:mx-9 grid h-[90vh] items-center justify-items-center font-["Montserrat"] text-lg sm:text-xl text-center'>
        Your Payment has been successful :)
    </div>
    </Fragment>
    )
}

export default Checkoutsuccess;