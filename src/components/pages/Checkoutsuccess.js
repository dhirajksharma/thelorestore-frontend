import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../actions/userAction';

const Checkoutsuccess=()=>{
    
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)

    useEffect(()=>{
        if(user)
            dispatch(addOrder(user.address, user.cart, user.phone))
    },[dispatch, user])

    return (
    <div className='mx-4 sm:mx-9 grid h-[90vh] items-center justify-items-center font-["Montserrat"] text-lg sm:text-xl text-center'>
        Your Payment has been successful :)
    </div>
    )
}

export default Checkoutsuccess;