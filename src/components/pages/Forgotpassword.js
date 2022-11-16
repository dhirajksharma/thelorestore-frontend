import {React, useEffect, useState,useRef, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMsg, forgotPassword } from '../../actions/userAction';
import Loader from '../elements/Loader';
import {toast} from 'react-toastify';
import Metadata from "../elements/Metadata";
import NavContext from '../elements/NavContext';
const Forgotpassword=()=>{
    const dispatch=useDispatch();
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
            toast('Boy! It\'s taking longer than usual. Bangalore traffic I guess 😅😅', {
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
        <div className='mx-4 sm:mx-9 h-[90vh] flex flex-col justify-center items-center'>
            <Metadata title="The Lore Store | Forgot Password" nav={3}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
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
                    <button type='submit' className='w-[250px] text-center tracking-wider mt-4 border-2 border-gray-500 hover:bg-gray-100 active:bg-gray-200 active:border-gray-300'>Get Password Reset Link</button>
                </form>
            )}
        </div>
    )
}

export default Forgotpassword;