import {Fragment, React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../actions/userAction';
import Metadata from "../../elements/Metadata";
import happyimg from '../../../res/3544858.jpg'
import { useNavigate } from 'react-router-dom';

const Checkoutsuccess=()=>{
    
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate();
    useEffect(()=>{
        let id=sessionStorage.getItem('checkoutSessionID')
        console.log(id)
        if(id==='' || id===null)
            navigate('/error')
        else if(user && user.cart && user.cart.length){
            sessionStorage.setItem('checkoutSessionID','')
            dispatch(addOrder(user.address, user.cart, user.phone,id))}
    },[dispatch, user, navigate])

    return (
        <Fragment>
            <Metadata title="The Lore Store | Checkout Success"  nav={-1}/>
            <div className='flex items-center justify-center h-[90vh]'>
                <img src={happyimg} className={window.innerHeight>window.innerWidth?'w-[90vw] ':'h-full '+' aspect-[6/5]'}></img>
            </div>
        </Fragment>
    )
}

export default Checkoutsuccess;