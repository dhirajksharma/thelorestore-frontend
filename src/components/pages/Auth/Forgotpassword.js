import {React, useEffect, useState,useRef, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMsg, forgotPassword } from '../../../actions/userAction';
import Loader from '../../elements/Loader';
import {toast} from 'react-toastify';
import Metadata from "../../elements/Metadata";
import NavContext from '../../elements/NavContext';
import fixPass from '../../../res/4256771.jpg';
import passFixed from '../../../res/4256772.png';
const Forgotpassword=()=>{
    const dispatch=useDispatch();
    const fixRef=useRef();
    const [forgotPassEmail, setForgotPassEmail]=useState("");

    const {error, message, loading}=useSelector((state)=>state.forgotPassword)
    const {serverError}=useContext(NavContext);

    const handleForgotPass=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(forgotPassEmail));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message){
            toast.info(message);
            fixRef.current.src=passFixed;
            dispatch(clearMsg());
        }
    },[dispatch, error, message]);
    
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
    
    return (
        <div className='mx-4 sm:mx-9 h-[90vh] flex flex-col md:flex-row justify-center md:justify-evenly items-center'>
            <Metadata title="The Lore Store | Forgot Password" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
                <Fragment>
                <img src={fixPass} ref={fixRef} className={window.innerHeight>window.innerWidth?'w-full ':'h-3/4 object-contain'}></img>
                <form onSubmit={handleForgotPass}
                className='flex flex-col font-serif justify-center items-center'>
                    <input
                        required
                        type="text"
                        placeholder="Enter Your Email"
                        value={forgotPassEmail}
                        className="border-b text-center mb-4 w-[250px]"
                        onChange={(e)=>setForgotPassEmail(e.target.value)}
                    />
                    <button type='submit' className='w-[250px] text-center tracking-wider mt-4 bg-yellow-400 hover:bg-yellow-300 rounded-md font-medium px-4 py-2'>Get Password Reset Link</button>
                </form>
                </Fragment>
            )}
        </div>
    )
}

export default Forgotpassword;